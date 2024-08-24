import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage";

// Thunk to fetch work experiences
export const fetchWorkExperiences = createAsyncThunk(
  "workExperiences/fetchWorkExperiences",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}work-experiences/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length === 0) {
        return defaultWorkExperienceData[template] || [];
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return defaultWorkExperienceData[template] || [];
      } else {
        return rejectWithValue(error.response.data || error.message);
      }
    }
  }
);

// Thunk to create a new work experience
export const createWorkExperience = createAsyncThunk(
  "workExperiences/createWorkExperience",
  async (workExperience, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}work-experiences/`,
        workExperience,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const workExperiencesSlice = createSlice({
  name: "workExperiences",
  initialState: {
    workExperiences: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkExperiences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkExperiences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workExperiences = action.payload;
      })
      .addCase(fetchWorkExperiences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(createWorkExperience.fulfilled, (state, action) => {
        state.workExperiences.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createWorkExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectWorkExperiences = (state) =>
  state.workExperiences.workExperiences;

export default workExperiencesSlice.reducer;
