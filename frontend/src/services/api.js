import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const fitnessAPI = {
  generatePlan: async (userData) => {
    const response = await api.post('/generate-plan', userData);
    return response.data;
  },

  generateWorkout: async (userData) => {
    const response = await api.post('/generate-workout', userData);
    return response.data;
  },

  generateDiet: async (userData) => {
    const response = await api.post('/generate-diet', userData);
    return response.data;
  },

  generateTips: async (userData) => {
    const response = await api.post('/generate-tips', userData);
    return response.data;
  },

  generateQuote: async (fitnessGoal) => {
    const response = await api.post('/generate-quote', { fitnessGoal });
    return response.data;
  },

  generateImage: async (prompt, type) => {
    const response = await api.post('/generate-image', { prompt, type });
    return response.data;
  },

  textToSpeech: async (text) => {
    const response = await api.post('/text-to-speech', { text }, {
      responseType: 'blob'
    });
    return response;
  },

  getVoices: async () => {
    const response = await api.get('/voices');
    return response.data;
  },

  exportPDF: async (userData, plan) => {
    const response = await api.post('/export-pdf', { userData, plan }, {
      responseType: 'blob'
    });
    return response;
  }
};

export default fitnessAPI;