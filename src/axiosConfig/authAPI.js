import axios from 'axios';

import { newDate } from '../redux/waterDetails/helpers';


const instance = axios.create({
  baseURL: 'https://water-tracker-06.onrender.com',
});

export const authApi = axios.create({
  baseURL: 'https://water-tracker-06.onrender.com/api-docs/',
});

export const setToken = token => {
  authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const removeToken = () => {
  authApi.defaults.headers.common.Authorization = ``;
};

// -------------------waterMonth----------------------

export const fetchMonthWater = async selectDate => {
  const { data } = await instance.get(
    `/api/user/water/month?date=${selectDate}`
  );
  return data;
};

// ----------- dailynorma-service -------------------
export const fetchDailyNorma = async () => {
  const { data } = await instance.get(`/api/users/dailynorma`);
  return data;
};

export const newDailyNorm = async ({ updatedData }) => {
  const { data } = await instance.patch(`/api/users/dailynorma`, updatedData);
  return data;
};

// -------------------water----------------------

export const fetchTodayWater = async () => {
  const time = newDate(new Date());
  const { data } = await instance.get(`/api/user/water/today?date=${time}`);
  return data;
};

export const addWaters = async newWater => {
  const { data } = await instance.post('/api/user/water', newWater);
  return data;
};

export const editWater = async ({ _id, id, newWater }) => {
  const { data } = await instance.put(
    `/api/user/water/${_id}?portionID=${id}`,
    newWater
  );
  return data;
};

export const deleteWater = async ({ id, _id }) => {
  await instance.delete(`/api/user/water/${_id}?portionID=${id}`);
};