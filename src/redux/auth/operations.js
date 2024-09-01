import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL =
  "https://water-tracker-06.onrender.com";


const provideAuthHeader = (accessToken) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

const deleteAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};


export const CreateUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", credentials);

      provideAuthHeader(res.data.accessToken);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const LogInUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", credentials);


      provideAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const LogOutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");

    deleteAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const RefreshUserToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {

    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;

    try {

      provideAuthHeader(persistedToken);
      const res = await axios.get("/auth/refresh");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const state = thunkAPI.getState();
      return state.auth.accessToken !== null;
    },
  }
);

export const UpdateUserAvatar = createAsyncThunk(
  "auth/avatar",
  async (file, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      provideAuthHeader(persistedToken);
      const formData = new FormData();
      formData.append("avatar", file); 
      const res = await axios.patch("/auth/avatar", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const UpdateUserInformation = createAsyncThunk(
  "auth/userUpdate",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      provideAuthHeader(persistedToken);
      const res = await axios.post("/auth/user", credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const GetUserInformation = createAsyncThunk(
  "auth/userInfo",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      provideAuthHeader(persistedToken);
      const res = await axios.get("/auth/user");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);