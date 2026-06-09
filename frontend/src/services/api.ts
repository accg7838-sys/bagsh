import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Admin authenticated instance
export function getAdminApi() {
  const token = localStorage.getItem('admin_token');
  return axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}
