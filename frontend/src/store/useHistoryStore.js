// useHistoryStore.js
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useHistoryStore = create((set) => ({
  history: [],
  loading: false,
  error: null,

  fetchHistory: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/history/user-history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ history: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch history', loading: false });
      toast.error('Failed to fetch history');
    }
  },

  addHistory: async (token, symptoms, prediction, probability, stage) => {
    set({ loading: true, error: null });
    
    try {
      const response = await axiosInstance.post(
        '/history/add-history',
        {
          symptoms,
          result: prediction === 1 ? 'Affected' : 'Not Affected',
          probability,
          stage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      set((state) => ({ history: [response.data.data, ...state.history] }));
      toast.success('Data saved successfully in history');
    } catch (error) {
      console.error('Error saving history:', error.response?.data || error.message);
      set({ error: error.response?.data?.message || 'Failed to save data in history', loading: false });
      toast.error('Failed to save data in history');
    }
  },
}));