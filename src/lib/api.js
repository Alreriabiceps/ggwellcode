import axios from 'axios';

// Force API base URL to port 5001
const API_BASE_URL = 'http://localhost:5001/api';

// Debug log to verify the correct API URL is being used
console.log('🔗 API Configuration:', {
  baseURL: API_BASE_URL,
  timestamp: new Date().toISOString()
});

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Create a separate axios instance for public requests
const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  login: (credentials) => publicApi.post('/auth/login', credentials),
  register: (userData) => publicApi.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  forgotPassword: (email) => publicApi.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => publicApi.post('/auth/reset-password', { token, password }),
};

// Provider API
export const providerAPI = {
  register: (providerData) => api.post('/providers/register', providerData),
  getAll: (params) => api.get('/providers', { params }),
  getById: (id) => api.get(`/providers/${id}`),
  update: (id, data) => api.put(`/providers/${id}`, data),
  getMyProfile: () => api.get('/providers/me'),
  search: (params) => api.get('/providers/search', { params }),
  getStats: () => api.get('/providers/stats'),
};

// Job API
export const jobAPI = {
  create: (jobData) => api.post('/jobs', jobData),
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
  apply: (jobId, applicationData) => api.post(`/jobs/${jobId}/apply`, applicationData),
  acceptApplication: (jobId, applicationId) => api.put(`/jobs/${jobId}/applications/${applicationId}/accept`),
  complete: (jobId) => api.put(`/jobs/${jobId}/complete`),
  getSuggestions: (jobId) => api.get(`/jobs/${jobId}/suggestions`),
};

// AI API
export const aiAPI = {
  extractTags: (text, businessName) => api.post('/ai/extract-tags', { text, businessName }),
  matchJob: (jobId) => api.post(`/ai/match-job/${jobId}`),
  enhanceProfile: (text) => api.post('/ai/enhance-profile', { text }),
  generateTags: (title, description) => api.post('/ai/generate-tags', { title, description }),
};

// Admin API
export const adminAPI = {
  getHighlights: () => api.get('/admin/highlights'),
  createHighlight: (data) => api.post('/admin/highlights', data),
  updateHighlight: (id, data) => api.put(`/admin/highlights/${id}`, data),
  deleteHighlight: (id) => api.delete(`/admin/highlights/${id}`),
  getDashboard: () => api.get('/admin/dashboard'),
  verifyProvider: (providerId) => api.put(`/admin/providers/${providerId}/verify`),
  getUsers: (params) => api.get('/admin/users', { params }),
};

export default api; 