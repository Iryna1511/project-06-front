import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://water-tracker-06.onrender.com/api-docs/',
});

export const setToken = token => {
  authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const removeToken = () => {
  authApi.defaults.headers.common.Authorization = ``;
};
