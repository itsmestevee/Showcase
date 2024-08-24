import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage";

const defaultSkillsData = {
  // Your static fallback data as before
  // (developer, photography, business)
};

// Create skill thunk
export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async (skillData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}skills/`,
        skillData,
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

// Fetch skills thunk
export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}skills/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length === 0) {
        return defaultSkillsData[template] || [];
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return defaultSkillsData[template] || [];
      } else {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  }
);

const skillSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills = action.payload;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload); // Add the new skill to the state
        state.status = "succeeded";
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default skillSlice.reducer;
