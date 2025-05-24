import axios from 'axios';
import { designers } from '../data/designers';
import type { Designer } from '../data/designers';

// In a real app, this would point to your Flask backend
const API_URL = '/api';

// Mock API service
export const api = {
  getDesigners: async (): Promise<Designer[]> => {
    try {
      // In a real implementation, this would use axios to fetch from the backend
      // const response = await axios.get(`${API_URL}/designers`);
      // return response.data;
      
      // For now, we're returning the mock data directly
      return Promise.resolve(designers);
    } catch (error) {
      console.error('Error fetching designers:', error);
      return [];
    }
  }
};

// Example of how to connect to the real backend when implemented
export const connectToRealBackend = async (): Promise<Designer[]> => {
  try {
    const response = await axios.get(`${API_URL}/designers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from real backend:', error);
    throw error;
  }
};