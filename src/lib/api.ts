// Centralized API configuration
// For production (Vercel), use direct API URL since rewrites may not work properly
// For development, can use /api proxy

const IS_PRODUCTION = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yumx.metronio.com';

// Use direct API URL instead of proxy to avoid CORS issues
export const API_BASE = API_BASE_URL;

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

// Enhanced fetch with error handling
export async function apiFetch(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}
