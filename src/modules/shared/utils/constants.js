// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  PROVIDERS: '/api/providers', 
  JOBS: '/api/jobs',
  AI: '/api/ai',
  AI_SMART_MATCHING: '/api/ai-smart-matching',
  ADMIN: '/api/admin'
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'Rekomendito',
  DESCRIPTION: 'Smart Provider Discovery Platform',
  VERSION: '1.0.0',
  REGION: 'Bataan Province'
};

// User Types
export const USER_TYPES = {
  CLIENT: 'client',
  PROVIDER: 'provider',
  ADMIN: 'admin'
};

// Provider Categories
export const PROVIDER_CATEGORIES = [
  'Construction',
  'Electrical',
  'Plumbing',
  'Carpentry',
  'Masonry',
  'Painting',
  'Roofing',
  'Landscaping',
  'Interior Design',
  'Architecture',
  'Engineering',
  'Maintenance',
  'Cleaning Services',
  'Security Services',
  'Transportation',
  'Catering',
  'Event Planning',
  'Photography',
  'Other Services'
];

// Bataan Municipalities
export const BATAAN_MUNICIPALITIES = [
  'Abucay',
  'Bagac', 
  'Balanga',
  'Dinalupihan',
  'Hermosa',
  'Limay',
  'Mariveles',
  'Morong',
  'Orani',
  'Orion',
  'Pilar',
  'Samal'
];

// File Upload Limits
export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  DOCUMENT_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  PHONE_PATTERN: /^(\+63|0)?9\d{9}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8'
  },
  SUCCESS: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
  },
  WARNING: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309'
  },
  ERROR: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c'
  }
};

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 700
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'rekomendito_auth_token',
  USER_PREFERENCES: 'rekomendito_user_preferences',
  SEARCH_HISTORY: 'rekomendito_search_history',
  THEME: 'rekomendito_theme'
}; 