import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage";

export const fetchAboutMe = createAsyncThunk(
  "about/fetchAboutMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}aboutme/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAboutMe = createAsyncThunk(
  "about/createAboutMe",
  async (aboutMeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}aboutme/`,
        aboutMeData,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    aboutData: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAboutMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aboutData = action.payload;
      })
      .addCase(fetchAboutMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(createAboutMe.fulfilled, (state, action) => {
        state.aboutData = action.payload;
      });
  },
});

export default aboutSlice.reducer;
