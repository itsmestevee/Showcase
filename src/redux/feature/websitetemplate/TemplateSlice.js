import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage"; // Update the import path

const defaultData = {
  developer: [
    {
      title: "Showcase",
      type: "Developer",
      social_media_link_json: ["https://facebook.com/", "https://github.com/"],
      portfolio_avatar: "/logoHomepage.png",
      biography:
        "CEO and chief engineer of SpaceX, a private aerospace manufacturer.",
      hero_image: "/developerimage/imgHeroDev.png",
      section_image: "http://example.com/default_section_image.jpg",
      created_by: "Elon Musk",
    },
  ],
  photography: [
    {
      title: "KIM NAMWOON",
      type: "Photographer",
      social_media_link_json: [
        "https://facebook.com/",
        "https://www.instagram.com/",
        "https://x.com/home",
        "https://www.pinterest.com/",
      ],
      portfolio_avatar:
        "https://cdn.pixabay.com/photo/2024/08/02/14/07/14-07-25-766_960_720.png",
      biography:
        "Discover how to make every moment a masterpiece by unleashing your creativity through fashion, hobbies, and daily activities.",
      hero_image:
        "https://i.pinimg.com/originals/d8/37/40/d83740b7b6cf9fb1166e3c25eb1cced4.jpg",
      section_image: "http://example.com/default_section_image.jpg",
      created_by: "Namwoon",
    },
  ],
  marketing: [
    {
      title: "Marketing",
      type: "Type C",
      social_media_link_json: ["https://linkedin.com/", "https://twitter.com/"],
      portfolio_avatar: "http://example.com/marketing_avatar.jpg",
      biography: "Marketing biography here",
      status: true,
      hero_image: "http://example.com/marketing_hero_image.jpg",
      section_image: "http://example.com/marketing_section_image.jpg",
      is_public: true,
      unique_slug: "dommm-marketing-077285",
    },
  ],
  business: [
    {
      title: "Showcase",
      type: "Developer",
      social_media_link_json: ["https://facebook.com/", "https://github.com/"],
      portfolio_avatar: "/logoHomepage.png",
      biography:
        "At augue eget arcu dictum. Maecenas ultricies mi eget mauris pharetra et. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. Mattis nunc sed blandit libero. At consectetur lorem donec massa sapien.",
      hero_image: "/businessImg/herosection.png",
      section_image: "http://example.com/default_section_image.jpg",
      created_by: "Strategy and growth solutions for business",
    },
  ],
};

export const fetchTemplates = createAsyncThunk(
  "templates/fetchTemplates",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}templates/`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchTemplateData = createAsyncThunk(
  "templates/fetchTemplateData",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}template-portfolios/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length === 0) {
        return defaultData[template] || [];
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return defaultData[template] || [];
      } else {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  }
);

export const selectTemplate = createAsyncThunk(
  "templates/selectTemplate",
  async ({ userId, templateId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}select-templates/`,
        {
          user: userId,
          template: templateId,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error
        throw error;
      }
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const templatesSlice = createSlice({
  name: "templates",
  initialState: {
    templates: [],
    selectedTemplate: null,
    templateData: {},
    status: "idle",
    error: null,
    // data for submit api
    templateData: null,
    selectedTemplateId: null,
    workExperiences: [],
    skills: [],
    projects: [],
    contacts: [],
    blogs: [],
    services: [],
  },
  reducers: {
    updateSelectedTemplateId: (state, action) => {
      state.selectedTemplateId = action.payload;
    },
    // Action to update any part of the state
    updatePortfolioData: (state, action) => {
      const { section, data } = action.payload;
      state[section] = data;
    },
    // Action to handle file uploads (e.g., images)
    uploadFile: (state, action) => {
      const { section, file } = action.payload;
      // Handle file upload logic and update the corresponding section
      // Example: state[section].image = file.url;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTemplateData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemplateData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.templateData = action.payload;
      })
      .addCase(fetchTemplateData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(selectTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(selectTemplate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedTemplate = action.payload.template;
        console.log("action.payload.template", action.payload.template);
      })
      .addCase(selectTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});
export const { updatePortfolioData, uploadFile, updateSelectedTemplateId } =
  templatesSlice.actions;
export const selectContactsData = (state) => state.templates.contacts;
export const selectPortfolioData = (state) => state.templatesSlice;

export default templatesSlice.reducer;
