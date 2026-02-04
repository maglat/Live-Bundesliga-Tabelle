/**
 * Bundesliga Tabelle - Main Application
 * Orchestrates the UI and data fetching
 */

import CONFIG from './config.js';
import api from './api.js';

class BundesligaTable {
  constructor() {
    this.state = {
      league: null,
      season: null,
      matchday: null,
      table: [],
      loading: false,
      error: null,
    };

    this.ui = {
      leagueSelect: null,
      seasonSelect: null,
      statusDot: null,
      statusText: null,
      matchdayInfo: null,
      tableContainer: null,
    };

    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    console.log('[App] Initializing Bundesliga Table app...');
    
    // Cache DOM references
    this.cacheElements();
    
    // Initialize theme
    this.initTheme();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Load initial data
    await this.loadInitialData();
  }

  /**
   * Cache DOM element references
   */
  cacheElements() {
    this.ui.leagueSelect = document.getElementById('league-select');
    this.ui.seasonSelect = document.getElementById('season-select');
    this.ui.statusDot = document.getElementById('status-dot');
    this.ui.statusText = document.getElementById('status-text');
    this.ui.matchdayInfo = document.getElementById('matchday-info');
    this.ui.tableContainer = document.getElementById('table-body');
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  initTheme() {
    const savedTheme = localStorage.getItem(CONFIG.UI.STORAGE_KEYS.THEME);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.setTheme(theme);
  }

  /**
   * Set the application theme
   */
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(CONFIG.UI.STORAGE_KEYS.THEME, theme);
  }

  /**
   * Toggle between light and dark mode
   */
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // League change
    this.ui.leagueSelect?.addEventListener('change', (e) => {
      this.onLeagueChange(e.target.value);
    });

    // Season change
    this.ui.seasonSelect?.addEventListener('change', (e) => {
      this.onSeasonChange(e.target.value);
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle?.addEventListener('click', () => this.toggleTheme());

    // Retry button
    const retryBtn = document.getElementById('retry-btn');
    retryBtn?.addEventListener('click', () => this.reload());

    // Close error banner
    const closeError = document.getElementById('close-error');
    closeError?.addEventListener('click', () => this.hideError());
  }

  /**
   * Load initial data (league, season, table)
   */
  async loadInitialData() {
    try {
      // Get current season
      const currentSeason = api.getCurrentSeason();
      this.state.season = currentSeason;

      // Populate league dropdown
      this.populateLeagueDropdown();
      
      // Set default league (1. Bundesliga)
      const defaultLeague = CONFIG.LEAGUES[0].id;
      this.state.league = defaultLeague;
      this.ui.leagueSelect.value = defaultLeague;

      // Load seasons for the league and populate dropdown
      await this.loadSeasons(defaultLeague, currentSeason);
      
      // Load the table
      await this.loadTable();

    } catch (error) {
      this.showError('Failed to initialize', error.message);
    }
  }

  /**
   * Populate league dropdown
   */
  populateLeagueDropdown() {
    this.ui.leagueSelect.innerHTML = '';
    
    CONFIG.LEAGUES.forEach(league => {
      const option = document.createElement('option');
      option.value = league.id;
      option.textContent = league.name;
      this.ui.leagueSelect.appendChild(option);
    });
  }

  /**
   * Load available seasons for a league
   */
  async loadSeasons(leagueShortcut, currentSeason) {
    try {
      const seasons = await api.getAvailableSeasons(leagueShortcut);
      
      this.ui.seasonSelect.innerHTML = '';
      
      // Create a Set to avoid duplicates
      const uniqueSeasons = [...new Set(seasons)];
      
      // Sort descending (newest first)
      uniqueSeasons.sort((a, b) => b - a);
      
      // Populate dropdown
      uniqueSeasons.forEach(season => {
        const option = document.createElement('option');
        option.value = season;
        option.textContent = `${season}/${season + 1}`;
        
        if (season === currentSeason) {
          option.selected = true;
        }
        
        this.ui.seasonSelect.appendChild(option);
      });

    } catch (error) {
      console.error('[App] Failed to load seasons:', error);
      // Fallback to basic seasons
      this.populateSeasonFallback(currentSeason);
    }
  }

  /**
   * Fallback for seasons if API fails
   */
  populateSeasonFallback(currentSeason) {
    this.ui.seasonSelect.innerHTML = '';
    const seasons = [currentSeason, currentSeason - 1, currentSeason - 2];
    
    seasons.forEach(season => {
      const option = document.createElement('option');
      option.value = season;
      option.textContent = `${season}/${season + 1}`;
      this.ui.seasonSelect.appendChild(option);
    });
  }

  /**
   * Handle league change
   */
  async onLeagueChange(league) {
    console.log(`[App] League changed to: ${league}`);
    this.state.league = league;
    
    // Clear cache for new league
    api.clearCache();
    
    // Reload seasons and table
    await this.loadSeasons(league, this.state.season);
    await this.loadTable();
    
    // Save preference
    localStorage.setItem(CONFIG.UI.STORAGE_KEYS.LAST_LEAGUE, league);
  }

  /**
   * Handle season change
   */
  async onSeasonChange(season) {
    console.log(`[App] Season changed to: ${season}`);
    this.state.season = parseInt(season);
    
    // Clear cache for new season
    api.clearCache();
    
    // Reload table
    await this.loadTable();
    
    // Save preference
    localStorage.setItem(CONFIG.UI.STORAGE_KEYS.LAST_SEASON, season);
  }

  /**
   * Load the league table
   */
  async loadTable() {
    this.setLoading(true);
    this.hideError();

    try {
      const { league, season } = this.state;

      // Update status
      this.updateStatus('loading', 'Lade Daten...');

      // Fetch data
      const [tableData, matchdayData] = await Promise.all([
        api.getTable(league, season),
        api.getCurrentMatchday(league, season),
      ]);

      // Update state
      this.state.table = tableData;
      this.state.matchday = matchdayData;

      // Update UI
      this.updateMatchdayInfo(matchdayData);
      this.renderTable(tableData);
      this.updateStatus('success', `Daten aktuell`);

      // Update page title
      const leagueName = CONFIG.LEAGUES.find(l => l.id === league)?.shortName || 'Bundesliga';
      document.title = `${leagueName} ${season}/${season + 1} - Live Tabelle`;

    } catch (error) {
      console.error('[App] Failed to load table:', error);
      this.updateStatus('error', 'Fehler beim Laden');
      this.showError(
        'Daten konnten nicht geladen werden',
        error.message || 'Bitte überprüfen Sie Ihre Internetverbindung.'
      );
      this.state.table = [];
      this.ui.tableContainer.innerHTML = '';
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Update matchday info display
   */
  updateMatchdayInfo(matchdayData) {
    if (matchdayData && this.ui.matchdayInfo) {
      const matchdayName = matchdayData.groupName || matchdayData.name || `Spieltag ${matchdayData.groupOrderID || '-'}`;
      const matchdayNumber = matchdayData.groupOrderID || '-';
      this.ui.matchdayInfo.textContent = `Aktueller Spieltag: ${matchdayNumber} / 34`;
    } else {
      this.ui.matchdayInfo.textContent = 'Aktueller Spieltag: - / 34';
    }
  }

  /**
   * Render the table
   */
  renderTable(data) {
    if (!this.ui.tableContainer) return;

    this.ui.tableContainer.innerHTML = '';

    if (!data || data.length === 0) {
      this.ui.tableContainer.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
            Keine Daten verfügbar
          </td>
        </tr>
      `;
      return;
    }

    // Preload logos for better performance
    api.preloadLogos(data);

    // Sort by rank
    const sortedData = [...data].sort((a, b) => {
      return (a.rank || 0) - (b.rank || 0);
    });

    // Create rows with staggered animation
    sortedData.forEach((team, index) => {
      const row = this.createTableRow(team, index);
      row.style.animationDelay = `${index * CONFIG.UI.ROW_ANIMATION_DELAY}ms`;
      this.ui.tableContainer.appendChild(row);
    });
  }

  /**
   * Create a single table row
   */
  createTableRow(team, index) {
    const row = document.createElement('div');
    row.className = 'table-row';
    
    // Add classification class based on rank
    const rank = team.rank || index + 1;
    const thresholds = CONFIG.THRESHOLDS;
    
    if (rank <= thresholds.CHAMPIONS_LEAGUE) {
      row.classList.add('champions-league');
    } else if (rank <= thresholds.EUROPA_LEAGUE) {
      row.classList.add('europa-league');
    } else if (rank === thresholds.RELEGATION_PLAYOFF) {
      row.classList.add('relegation-playoff');
    } else if (rank >= thresholds.RELEGATION) {
      row.classList.add('relegation');
    }

    // Team logo URL
    const logoUrl = `https://tmb.openligadb.de/${team.teamId}/logo.png`;

    row.innerHTML = `
      <span class="cell-rank">${rank}</span>
      <div class="team-cell">
        <img 
          src="${logoUrl}" 
          alt="${team.teamName}"
          class="team-logo"
          loading="lazy"
          onerror="this.style.display='none'"
        />
        <span class="team-name" title="${team.teamName}">${team.teamName}</span>
      </div>
      <span class="cell-small">${team.matches || 0}</span>
      <span class="cell-small">${team.won || 0}</span>
      <span class="cell-small">${team.draw || 0}</span>
      <span class="cell-small">${team.lost || 0}</span>
      <span class="cell-points">${team.points || 0}</span>
    `;

    return row;
  }

  /**
   * Update loading state
   */
  setLoading(loading) {
    this.state.loading = loading;
    
    if (loading) {
      this.ui.tableContainer.innerHTML = this.createSkeletonLoader();
    }
  }

  /**
   * Create skeleton loader HTML
   */
  createSkeletonLoader() {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      rows.push(`
        <div class="skeleton-row">
          <div class="skeleton" style="width: 30px; height: 20px;"></div>
          <div class="skeleton skeleton-team-logo"></div>
          <div class="skeleton skeleton-team-name"></div>
          <div class="skeleton" style="width: 40px; height: 20px;"></div>
          <div class="skeleton" style="width: 30px; height: 20px;"></div>
          <div class="skeleton" style="width: 30px; height: 20px;"></div>
          <div class="skeleton" style="width: 50px; height: 24px;"></div>
        </div>
      `);
    }
    return rows.join('');
  }

  /**
   * Update status indicator
   */
  updateStatus(status, message) {
    if (!this.ui.statusDot) return;
    
    // Remove all status classes
    this.ui.statusDot.classList.remove('loading', 'success', 'error');
    
    // Add new status class
    if (status) {
      this.ui.statusDot.classList.add(status);
    }
    
    // Update message
    if (this.ui.statusText) {
      this.ui.statusText.textContent = message;
    }
  }

  /**
   * Show error state
   */
  showError(title, message) {
    const errorContainer = document.getElementById('error-container');
    const errorTitle = document.getElementById('error-title');
    const errorMessage = document.getElementById('error-message');
    
    if (errorContainer && errorTitle) {
      errorTitle.textContent = title;
      if (errorMessage) {
        errorMessage.textContent = message;
      }
      errorContainer.style.display = 'block';
    }
  }

  /**
   * Hide error state
   */
  hideError() {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
      errorContainer.style.display = 'none';
    }
  }

  /**
   * Reload data
   */
  async reload() {
    api.clearCache();
    await this.loadTable();
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new BundesligaTable();
});

export default BundesligaTable;