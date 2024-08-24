import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage";

// Static fallback data
const staticBlogs = [
  {
    id: 1,
    title: "Sample Blog 1",
    description: "This is a sample blog description.",
    images: ["https://example.com/image1.jpg"],
  },
  {
    id: 2,
    title: "Sample Blog 2",
    description: "This is another sample blog description.",
    images: ["https://example.com/image2.jpg"],
  },
];

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}blogs/`,
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

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}blogs/`,
        {
          title: blogData.title,
          description: blogData.description,
          images: blogData.images.length > 0 ? blogData.images : [],
        },
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

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetBlogsState: (state) => {
      state.blogs = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload.length ? action.payload : staticBlogs;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.blogs = staticBlogs; // Use static data on failure
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetBlogsState } = blogSlice.actions;
export default blogSlice.reducer;
