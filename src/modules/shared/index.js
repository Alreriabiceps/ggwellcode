// Components
export { default as AnimatedCounter } from './components/AnimatedCounter';
export { default as AnimatedSection } from './components/AnimatedSection';

// Utils
export * from './utils/constants';

// Re-export commonly used hooks and utilities from other parts of the app
export { default as useGeolocation } from '../../hooks/useGeolocation';
export * from '../../lib/utils';
export * from '../../lib/api'; 