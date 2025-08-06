const API_BASE_URL = 'https://localhost:7039/api';

class AuthService {
  constructor() {
    this.TOKEN_KEY = 'freelancer_hub_token';
    this.USER_KEY = 'freelancer_hub_user';
  }

  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Error || errorData.Details || 'Login failed');
      }

      const authResponse = await response.json();
      
      // Store token and user info in localStorage
      this.setToken(authResponse.token);
      this.setUser({
        email: authResponse.email,
        personName: authResponse.personName,
      });

      return authResponse;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Error || errorData.Details || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

logout() {
  localStorage.removeItem(this.TOKEN_KEY);
  localStorage.removeItem(this.USER_KEY);
}

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUser() {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Decode JWT token to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  isAuthenticated() {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired();
  }

  // Method to make authenticated API requests
  async authenticatedFetch(url, options = {}) {
    const token = this.getToken();
    
    if (!token || this.isTokenExpired()) {
      this.logout();
      throw new Error('Authentication required');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    return fetch(fullUrl, {
      ...options,
      headers,
    });
  }

  // Helper method to refresh token if your backend supports it
  async refreshToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { token } = await response.json();
      this.setToken(token);
      return token;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      throw error;
    }
  }
}

export default new AuthService();