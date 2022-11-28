import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../api";

export const getVideoList = createAsyncThunk(
  "auth/getVideoList",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.getVideoList(formValue);
      navigate("/");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  videos: [],
  error: "",
  loading: false,
};

export const videolistSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setLogout: (state, action) => {
      state.user = null;
      Cookies.set("user", "");
    },
    updatePicture: (state, action) => {
      state.user.picture = action.payload;
      Cookies.set(
        "user",
        JSON.stringify({
          ...state.user,
          picture: action.payload,
        })
      );
    },
  },
  extraReducers: {
    [getVideoList.pending]: (state, action) => {
      state.loading = true;
    },
    [getVideoList.fulfilled]: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.error = "";
    },
    [getVideoList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogout, updatePicture } = videolistSlice.actions;

export default videolistSlice.reducer;
