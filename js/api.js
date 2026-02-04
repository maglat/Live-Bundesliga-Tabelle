/**
 * Bundesliga Tabelle - API Module
 * Handles all API calls with error handling and caching
 */

import CONFIG from './config.js';

class ApiError extends Error {
  constructor(message, status, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

class ApiService {
  constructor() {
    this.baseUrl = CONFIG.API.BASE_URL;
  }

  /**
   * Create a cache key for the API response
   */
  getCacheKey(endpoint) {
    return `${CONFIG.CACHE.KEY_PREFIX}${endpoint.replace(/\//g, '_')}`;
  }

  /**
   * Check if cached data is still valid
   */
  isCacheValid(cacheData) {
    if (!CONFIG.CACHE.ENABLED || !cacheData) return false;
    const now = Date.now();
    const cacheAge = now - cacheData.timestamp;
    return cacheAge < CONFIG.CACHE.DURATION;
  }

  /**
   * Get data from cache
   */
  getFromCache(endpoint) {
    try {
      const cacheKey = this.getCacheKey(endpoint);
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const cacheData = JSON.parse(cached);
        if (this.isCacheValid(cacheData)) {
          console.log(`[API] Cache hit for: ${endpoint}`);
          return cacheData.data;
        }
      }
    } catch (error) {
      console.warn('[API] Cache read error:', error);
    }
    return null;
  }

  /**
   * Save data to cache
   */
  saveToCache(endpoint, data) {
    try {
      if (!CONFIG.CACHE.ENABLED) return;
      const cacheKey = this.getCacheKey(endpoint);
      const cacheData = {
        timestamp: Date.now(),
        data: data,
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      console.log(`[API] Cached: ${endpoint}`);
    } catch (error) {
      console.warn('[API] Cache write error:', error);
    }
  }

  /**
   * Clear cache for a specific endpoint or all
   */
  clearCache(endpoint = null) {
    try {
      if (endpoint) {
        const cacheKey = this.getCacheKey(endpoint);
        localStorage.removeItem(cacheKey);
      } else {
        // Clear all app-related cache
        Object.keys(localStorage)
          .filter(key => key.startsWith(CONFIG.CACHE.KEY_PREFIX))
          .forEach(key => localStorage.removeItem(key));
      }
      console.log('[API] Cache cleared');
    } catch (error) {
      console.warn('[API] Cache clear error:', error);
    }
  }

  /**
   * Make an API request with retry logic
   */
  async fetch(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const cacheKey = endpoint;

    // Check cache first
    const cachedData = this.getFromCache(cacheKey);
    if (cachedData && !options.forceRefresh) {
      return cachedData;
    }

    // Make the request with retry logic
    let lastError = null;
    for (let attempt = 1; attempt <= CONFIG.API.RETRY_ATTEMPTS; attempt++) {
      try {
        console.log(`[API] Request: ${url} (attempt ${attempt})`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          CONFIG.API.TIMEOUT
        );

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new ApiError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status
          );
        }

        const data = await response.json();

        // Save to cache
        this.saveToCache(cacheKey, data);

        return data;

      } catch (error) {
        lastError = error;
        
        if (error.name === 'AbortError') {
          console.warn(`[API] Timeout on attempt ${attempt}`);
        } else {
          console.error(`[API] Error on attempt ${attempt}:`, error.message);
        }

        // Don't retry on the last attempt
        if (attempt < CONFIG.API.RETRY_ATTEMPTS) {
          await new Promise(resolve => 
            setTimeout(resolve, CONFIG.API.RETRY_DELAY * attempt)
          );
        }
      }
    }

    throw new ApiError(
      `Failed after ${CONFIG.API.RETRY_ATTEMPTS} attempts: ${lastError?.message}`,
      0,
      lastError?.details
    );
  }

  /**
   * Get the current season based on current date
   */
  getCurrentSeason() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Season starts in July (month 6), so if before July, use last year's season
    if (currentMonth < 6) {
      return currentYear - 1;
    }
    return currentYear;
  }

  /**
   * Get available seasons for a league
   */
  async getAvailableSeasons(leagueShortcut) {
    try {
      const endpoint = `/getavailableavails/${leagueShortcut}`;
      return await this.fetch(endpoint);
    } catch (error) {
      console.error('[API] Failed to fetch seasons:', error);
      throw error;
    }
  }

  /**
   * Get the current or next matchday
   */
  async getCurrentMatchday(leagueShortcut, season) {
    try {
      const endpoint = `/getcurrentgroup/${leagueShortcut}/${season}`;
      return await this.fetch(endpoint);
    } catch (error) {
      console.error('[API] Failed to fetch current matchday:', error);
      throw error;
    }
  }

  /**
   * Get the league table
   */
  async getTable(leagueShortcut, season) {
    try {
      const endpoint = `/getbltable/${leagueShortcut}/${season}`;
      const data = await this.fetch(endpoint);
      return data;
    } catch (error) {
      console.error('[API] Failed to fetch table:', error);
      throw error;
    }
  }

  /**
   * Get team logo URL
   */
  getTeamLogoUrl(teamId, teamName) {
    // Use OpenLigaDB team logo endpoint
    // Try different logo sources in order of preference
    
    // Option 1: OpenLigaDB logos
    return `https://tmb.openligadb.de/${teamId}/logo.png`;
  }

  /**
   * Preload team logos
   */
  async preloadLogos(teams) {
    const logos = [];
    for (const team of teams) {
      const logoUrl = this.getTeamLogoUrl(team.teamId, team.teamName);
      logos.push({
        teamId: team.teamId,
        logoUrl,
      });
    }
    return logos;
  }
}

// Export singleton instance
const api = new ApiService();
export default api;
export { ApiError, ApiService };