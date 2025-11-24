import axios from 'axios';
import Constants from 'expo-constants';
import authService from './authService';

const extra =
  Constants?.expoConfig?.extra ??
  Constants?.manifest?.extra ??
  Constants?.manifest2?.extra ??
  {};

const BASE_URL = extra?.apiBaseUrl || 'https://www.tamerkose.com/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Token alınamadı:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleError = (error) => {
  if (error.response) {
    return {
      success: false,
      error: error.response.data?.message || 'Bir hata oluştu',
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    return {
      success: false,
      error: 'Ağ hatası. İnternet bağlantınızı kontrol edin.',
      status: 0,
    };
  } else {
    return {
      success: false,
      error: error.message || 'Bir hata oluştu',
      status: 0,
    };
  }
};

export const get = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const post = async (endpoint, body = {}) => {
  try {
    const response = await apiClient.post(endpoint, body);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const put = async (endpoint, body = {}) => {
  try {
    const response = await apiClient.put(endpoint, body);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const patch = async (endpoint, body = {}) => {
  try {
    const response = await apiClient.patch(endpoint, body);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const del = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
};

const apiService = {
  get,
  post,
  put,
  patch,
  delete: del,
};

export default apiService;

