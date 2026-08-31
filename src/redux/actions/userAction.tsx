import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";

export interface GetAllUsersParams {
  cursor?: string | null;
  limit?: number;
  search?: string;
  role?: string;
  skill?: string;
  experience?: string;
  availability?: string;
}

export const getAllUsers = createAsyncThunk<any, GetAllUsersParams>(
  "getAllUsers",
  async (
    { cursor, limit = 10, search, role, skill, experience, availability },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();

      params.append("limit", String(limit));

      if (cursor) params.append("cursor", cursor);
      // Search + filters run server-side (see /feed) so results from pages
      // not yet fetched into the browser are still found, instead of only
      // matching whatever's already loaded client-side.
      if (search) params.append("search", search);
      if (role) params.append("role", role);
      if (skill) params.append("skill", skill);
      if (experience) params.append("experience", experience);
      if (availability) params.append("availability", availability);

      const response = await callApi.get(`/feed?${params.toString()}`);
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get users failed");
    }
  },
);

export const getAllRequests = createAsyncThunk<any>(
  "getAllRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi.get("/user/requests");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get requests failed");
    }
  },
);

export const getAllMatches = createAsyncThunk<any>(
  "getAllMatches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi.get("/user/matches");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get matches failed");
    }
  },
);
