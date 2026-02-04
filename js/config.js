/**
 * Bundesliga Tabelle - Configuration
 * All configuration constants in one place
 */

const CONFIG = {
  // API Configuration
  API: {
    BASE_URL: 'https://api.openligadb.de',
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },

  // Available leagues
  LEAGUES: [
    { id: 'bl1', name: '1. Bundesliga', shortName: 'Bundesliga' },
    { id: 'bl2', name: '2. Bundesliga', shortName: '2. Bundesliga' },
    { id: 'bl3', name: '3. Liga', shortName: '3. Liga' },
  ],

  // League to logo mapping (OpenLigaDB uses different abbreviations)
  LEAGUE_LOGO_MAP: {
    'bl1': 'bundesliga',
    'bl2': '2bundesliga',
    'bl3': '3liga',
  },

  // Table thresholds for coloring
  THRESHOLDS: {
    CHAMPIONS_LEAGUE: 4,   // Places 1-4
    EUROPA_LEAGUE: 6,      // Places 5-6
    RELEGATION_PLAYOFF: 16, // Place 16
    RELEGATION: 17,        // Places 17-18
  },

  // Cache settings
  CACHE: {
    ENABLED: true,
    DURATION: 5 * 60 * 1000, // 5 minutes
    KEY_PREFIX: 'bundesliga_',
  },

  // UI settings
  UI: {
    ANIMATION_DURATION: 300,
    ROW_ANIMATION_DELAY: 50,
    LOGO_SIZE: 36,
    STORAGE_KEYS: {
      THEME: 'bundesliga_theme',
      LAST_LEAGUE: 'bundesliga_last_league',
      LAST_SEASON: 'bundesliga_last_season',
    },
  },
};

export default CONFIG;