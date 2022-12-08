import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const searchVideos = createAsyncThunk(
  "search/searchVideos",
  async ({ key }) => {
    try {
      const { data } = await api.searchVideo(key);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

const initialState = {
  videosSearch: null,
  error: "",
  loading: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [searchVideos.pending]: (state, action) => {
      state.loading = true;
    },
    [searchVideos.fulfilled]: (state, action) => {
      state.loading = false;
      state.videosSearch = action.payload.items;
      state.error = "";
    },
    [searchVideos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setLogout, updatePicture } = searchSlice.actions;

export default searchSlice.reducer;
