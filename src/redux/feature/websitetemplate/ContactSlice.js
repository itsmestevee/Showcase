import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage";

const defaultData = {
  developer: [
    {
      address: "456 Developer Lane",
      contact_email: "dev@portfolio.com",
      phone: "+1234567890",
      title: "Contact Your Developer",
      description:
        "Reach out to discuss your next big project, available during business hours (9:00 a.m. - 6:00 p.m. ET, Monday to Friday).",
    },
  ],
  photography: [
    {
      address: "456 Developer Lane",
      contact_email: "dev@portfolio.com",
      phone: "+1234567890",
      title: "Contact Your Developer",
      description:
        "Hello, Get in touch!Press inquiries, personal inquiries, commissions or collaborations... We are happy to hear from you!",
    },
  ],
  marketing: [
    {
      address: "101 Marketing Blvd",
      contact_email: "marketing@portfolio.com",
      phone: "+1122334455",
      title: "Contact Your Marketing Team",
      description:
        "We are here to help you with your marketing needs. Contact us to boost your brand visibility, available during business hours (9:00 a.m. - 6:00 p.m. ET, Monday to Friday).",
    },
  ],
  business: [
    {
      address: "123 Business St, Corporate City, Businessland",
      contact_email: "contact@businessportfolio.com",
      phone: "+1 555 123 4567",
      title: "Contact Your Business Consultant",
      description:
        "We're here to help with any business inquiries. Reach out to us through any of the contact methods listed here.",
    },
  ],
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}contacts/`,
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
        // If 404 error, return default data based on the template
        return defaultData[template] || [];
      } else {
        return rejectWithValue(error.response.data || error.message);
      }
    }
  }
);

export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}contacts/`,
        contactData,
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

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const { id, ...data } = contactData;
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}contacts/${id}/`,
        {
          ...data,
          // Replace empty fields with "empty"
          address: data.address || "empty",
          contact_email: data.contact_email || "empty",
          phone: data.phone || "empty",
          title: data.title || "empty",
          description: data.description || "empty",
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
      if (!error.response) {
        // Network error
        throw error;
      }
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    status: "idle",
    error: null,
  },

  reducers: {
    // Action to update contact data in the state
    updateContactData: (state, action) => {
      const { id, field, value } = action.payload;
      const contactIndex = state.contacts.findIndex(
        (contact) => contact.id === id
      );
      if (contactIndex !== -1) {
        state.contacts[contactIndex][field] = value;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = [action.payload];
      })
      .addCase(createContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(updateContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { updateContactData } = contactSlice.actions;

export default contactSlice.reducer;
