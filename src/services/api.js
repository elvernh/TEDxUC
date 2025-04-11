import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://dickyyyy.site';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expired or invalid errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/api/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiClient.put('/api/auth/changepassword', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  getRole: () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).role;
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  
  isAdmin: () => {
    return authService.getRole() === 'admin';
  }
};

// Registration services
export const registrationService = {
  verifyQrCode: async (qrData) => {
    try {
      const response = await apiClient.post('/api/registrations/verify-qr', { qrData });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  markAttendance: async (registrationId) => {
    try {
      const response = await apiClient.put(`/api/registrations/${registrationId}/attend`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getRegistrationsByEvent: async (eventId) => {
    try {
      const response = await apiClient.get(`/api/registrations/event/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Event services
export const eventService = {
  getEvents: async () => {
    try {
      const response = await apiClient.get('/api/events');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getEventById: async (id) => {
    try {
      const response = await apiClient.get(`/api/events/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apiClient;