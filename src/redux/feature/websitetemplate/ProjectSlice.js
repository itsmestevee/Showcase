import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage";

// Static fallback data
const staticProjects = [
  {
    id: 1,
    project_title: "Sample Project 1",
    project_description: "This is a sample project description.",
    link_to_project: "https://example.com/project1",
    project_image: "https://example.com/image1.jpg",
  },
  {
    id: 2,
    project_title: "Sample Project 2",
    project_description: "This is another sample project description.",
    link_to_project: "https://example.com/project2",
    project_image: "https://example.com/image2.jpg",
  },
];

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}projects/`,
        projectData,
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

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}projects/`,
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

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default projectSlice.reducer;
