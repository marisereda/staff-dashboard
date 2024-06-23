import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_SERVER_URL : import.meta.env.BASE_URL,
});
4;
