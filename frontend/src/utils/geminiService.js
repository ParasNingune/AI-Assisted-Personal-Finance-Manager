import axiosInstance from './axiosInstance';

export const geminiService = {
  startChat: async () => {
    try {
      const response = await axiosInstance.post('/gemini/start');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendMessage: async (message) => {
    try {
      const response = await axiosInstance.post('/gemini/chat', { message });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};