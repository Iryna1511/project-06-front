import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosLoader } from "../../axiosConfig/axiosLoader";

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
export const getMonthWater = createAsyncThunk(
  "monthWater/getMonthWater",
  async (selectDate, thunkAPI) => {
    try {
      const { data } = await axiosLoader.get(
        `/water/month?month=${selectDate}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
