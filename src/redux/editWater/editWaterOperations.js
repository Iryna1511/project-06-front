// router.patch(
//     "/water/:id"

import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosLoader } from "../../axiosConfig/axiosLoader";


// export const updateWaterConsumptionByIdController = async (req, res) => {
//     const { id } = req.params;
//     const { waterVolume, date } = req.body;
  
//     const updatedEntry = await updateWaterConsumptionById({
//       id,
//       waterVolume,
//       date,
//     });
  
//     res.status(200).json({
//       status: 200,
//       message: "Successfully updated water consumption!",
//       data: updatedEntry,
//     });
//   };


export const editWaterConsumption = createAsyncThunk(
  "water/editWater",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await axiosLoader.patch(`/water/${id}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
