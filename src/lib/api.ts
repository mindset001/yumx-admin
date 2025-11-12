// Centralized API configuration
// All API calls go through /api proxy to bypass CORS

export const API_BASE = '/api';

export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE}/auth/login`,
  verifyOtp: (code: string) => `${API_BASE}/auth/login/verify/${code}`,
  
  // Management
  chefs: `${API_BASE}/chef`,
  customers: `${API_BASE}/customer`,
  meals: `${API_BASE}/meal`,
  orders: `${API_BASE}/order`,
};

// Helper function to get auth headers
export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  
  return headers;
}

// Helper function to build API URL with query params
export function buildApiUrl(endpoint: string, params?: Record<string, string | number>): string {
  if (!params) return endpoint;
  
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  return `${endpoint}?${queryString}`;
}
