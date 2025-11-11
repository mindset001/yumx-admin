import { store } from '@/lib/store';
import { setCredentials, logout } from '@/lib/features/auth/authSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'manager' | 'staff';
  };
  token: string;
}

export const auth = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store auth data in localStorage
      localStorage.setItem('auth', JSON.stringify(data));
      
      // Update Redux store
      store.dispatch(setCredentials(data));
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    try {
      // Clear localStorage
      localStorage.removeItem('auth');
      
      // Update Redux store
      store.dispatch(logout());
      
      // Redirect to login page
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const state = store.getState();
    return !!state.auth.token && !!state.auth.user;
  },

  // Initialize auth state from localStorage
  initAuth: () => {
    try {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const data = JSON.parse(authData);
        store.dispatch(setCredentials(data));
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      localStorage.removeItem('auth');
    }
  },
};