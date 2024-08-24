import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage";

const defaultServicesData = {
  developer: [
    {
      image: [
        {
          url: "http://example.com/default_developer_service_image.jpg",
          alt: "Default Developer Image 1",
        },
      ],
      title: "Developer Service Title 1",
      description: "Developer service description 1",
    },
    {
      image: [
        {
          url: "http://example.com/default_developer_service_image_2.jpg",
          alt: "Default Developer Image 2",
        },
      ],
      title: "Developer Service Title 2",
      description: "Developer service description 2",
    },
  ],
  business: [
    {
      image: [
        {
          url: "/businessImg/Vector.png",
          alt: "Default Business Image 1",
        },
      ],
      title: "Strategic Planning",
      description:
        "Tortor dignissim convallis aenean et tortor at. Elementum nisi quis eleifend quam adipiscing vitae.",
    },
    {
      image: [
        {
          url: "/businessImg/Service2.png",
          alt: "Default Business Image 1",
        },
      ],
      title: "Financial Analysis",
      description:
        "Tortor dignissim convallis aenean et tortor at. Elementum nisi quis eleifend quam adipiscing vitae.",
    },
    {
      image: [
        {
          url: "/businessImg/Service3.png",
          alt: "Default Business Image 1",
        },
      ],
      title: "Market Research",
      description:
        "Tortor dignissim convallis aenean et tortor at. Elementum nisi quis eleifend quam adipiscing vitae.",
    },
    {
      image: [
        {
          url: "/businessImg/Service4.png",
          alt: "Default Business Image 1",
        },
      ],
      title: "Inventory manage",
      description:
        "Tortor dignissim convallis aenean et tortor at. Elementum nisi quis eleifend quam adipiscing vitae.",
    },
    {
      image: [
        {
          url: "/businessImg/Service5.png",
          alt: "Default Business Image 1",
        },
      ],
      title: "Sales & Marketing",
      description:
        "Tortor dignissim convallis aenean et tortor at. Elementum nisi quis eleifend quam adipiscing vitae.",
    },
    {
      image: [
        {
          url: "/businessImg/Service6.png",
          alt: "Default Business Image 1",
        },
      ],
      title: "Analytics",
      description:
        "Tortor dignissim convallis aenean et tortor at. Elementum nisi quis eleifend quam adipiscing vitae.",
    },
  ],
  marketing: [
    {
      image: [
        {
          url: "/businessImg/Service4.png",
          alt: "Default Marketing Image 1",
        },
      ],
      title: "Marketing Service Title 1",
      description: "Marketing service description 1",
    },
  ],
  photography: [
    {
      image: [
        {
          url: "http://example.com/default_photography_service_image.jpg",
          alt: "Default Photography Image 1",
        },
      ],
      title: "Photography Service Title 1",
      description: "Photography service description 1",
    },
  ],
};

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}services/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length === 0) {
        return defaultServicesData[template] || [];
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If 404 error, return default data based on the template
        return defaultServicesData[template] || [];
      } else {
        return rejectWithValue(error.response.data || error.message);
      }
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default serviceSlice.reducer;
