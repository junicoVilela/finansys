export const APP_CONSTANTS = {
  API: {
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3
  },
  
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100]
  },
  
  CURRENCY: {
    DEFAULT_LOCALE: 'pt-BR',
    DEFAULT_CURRENCY: 'BRL',
    DEFAULT_SYMBOL: 'R$'
  },
  
  DATE_FORMATS: {
    INPUT: 'yyyy-MM-dd',
    DISPLAY: 'dd/MM/yyyy',
    DATETIME: 'dd/MM/yyyy HH:mm'
  },
  
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_NAME_LENGTH: 100
  },
  
  STORAGE_KEYS: {
    USER: 'currentUser',
    THEME: 'selectedTheme',
    LANGUAGE: 'selectedLanguage'
  },
  
  ENTRY_TYPES: {
    REVENUE: 'revenue',
    EXPENSE: 'expense'
  } as const,
  
  TOAST_CONFIG: {
    TIMEOUT: 5000,
    CLOSE_BUTTON: true,
    PROGRESS_BAR: true
  }
};

export type EntryType = typeof APP_CONSTANTS.ENTRY_TYPES[keyof typeof APP_CONSTANTS.ENTRY_TYPES]; 