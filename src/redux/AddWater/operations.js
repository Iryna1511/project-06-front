import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Додавання нової води
export const addWater = createAsyncThunk(
  "water/addWater",
  async (newWater, thunkAPI) => {
    try {
      const response = await axios.post("/water", newWater);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
