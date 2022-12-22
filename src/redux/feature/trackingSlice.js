import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  trackingSelected: localStorage.getItem("tracking")
    ? JSON.parse(localStorage.getItem("tracking"))
    : null,
  error: "",
  loading: false,
};

export const trackingSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTracking: (state, action) => {
      state.trackingSelected = action.payload;
      localStorage.setItem("tracking", JSON.stringify(state.trackingSelected));
    },

    // setCategory: (state, action) => {
    //   state.category = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setTracking } = trackingSlice.actions;

export default trackingSlice.reducer;
