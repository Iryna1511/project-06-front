import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosLoader } from "../../axiosConfig/axiosLoader";
import axios from "axios";

axios.defaults.baseURL = "https://water-tracker-06.onrender.com";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// запит працює повертає обєкт з обєктами даних
// {
//   "status": 201,
//   "message": "Successfully added water consumption!",
//   "data": {
//       "user_id": "66db6a1a133a08495b567b55",
//       "date": "2024-09-01T10:00:00.000Z",
//       "waterVolume": 1200,
//       "_id": "66deffd13281102618b96f06",
//       "createdAt": "2024-09-09T14:01:53.296Z",
//       "updatedAt": "2024-09-09T14:01:53.296Z"
//   }
// }

// Визначаємо асинхронний екшн для отримання даних про споживання води за місяць
export const getMonthWater = createAsyncThunk(
  "monthWater/getMonthWater", // Назва екшну
  async (selectDate, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (token) {
      setAuthHeader(token);
    }
    // selectDate - дата місяця для запиту
    try {
      // Виконуємо GET запит для отримання даних про споживання води
      const { data } = await axios.get(`/water/month?month=${selectDate}`);
      return data; // Повертаємо отримані дані
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // У разі помилки повертаємо повідомлення про помилку
    }
  }
);
