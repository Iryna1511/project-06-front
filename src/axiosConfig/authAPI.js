import axios from "axios";

import { newDate } from "../redux/waterDetails/helpers";

const instance = axios.create({
  baseURL: "https://water-tracker-06.onrender.com",
});

export const authApi = axios.create({
  baseURL: "https://water-tracker-06.onrender.com/api-docs/",
  withCredentials: true,
});

export const setToken = (token) => {
  authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const removeToken = () => {
  authApi.defaults.headers.common.Authorization = ``;
};

// -------------------waterMonth----------------------
//

// todo: робити через метод або через константу intance @Anna Laptur
const getInstance = () => {
  // можно засетити токен з локалсторадж  @Anna Laptur

  // const token = localStorage.getItem("authToken");
  // if (token) {
  //   instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  // }
  return instance;
};

// також потрібно перевірити правильність url запіту @Anna Laptur

export const fetchMonthWater = async (selectDate) => {
  const { data } = await getInstance().get(`/water/month?date=${selectDate}`);
  return data;
};

// ----------- dailynorma-service -------------------
export const fetchDailyNorma = async () => {
  const { data } = await getInstance().get(`/api/users/dailynorma`);
  return data;
};

export const newDailyNorm = async ({ updatedData }) => {
  const { data } = await getInstance().patch(
    `/api/users/dailynorma`,
    updatedData
  );
  return data;
};

// -------------------water----------------------

// ось це теж чіпаю
export const fetchTodayWater = async () => {
  const time = newDate(new Date());
  const { data } = await getInstance().get(
    `/api/user/water/today?date=${time}`
  );
  return data;
};

export const addWaters = async (newWater) => {
  const { data } = await getInstance().post("/api/user/water", newWater);
  return data;
};

export const editWater = async ({ _id, id, newWater }) => {
  const { data } = await getInstance().put(
    `/api/user/water/${_id}?portionID=${id}`,
    newWater
  );
  return data;
};

export const deleteWater = async ({ id, _id }) => {
  await getInstance().delete(`/api/user/water/${_id}?portionID=${id}`);
};
