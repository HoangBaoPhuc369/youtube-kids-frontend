import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getVideoList = createAsyncThunk(
  "videos/getVideoList",
  async () => {
    try {
      const { data } = await api.getVideoList();
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const getChannelVideo = createAsyncThunk(
  "videos/getChannelVideo",
  async ({ idChannel }, { rejectWithValue }) => {
    try {
      const { data } = await api.getChannelVideo(idChannel);
      console.log(data);
      return data;
    } catch (err) {
      return err.response?.data;
    }
  }
);

const initialState = {
  videos: null,
  channelVideo: null,
  error: "",
  loading: false,
};

export const videolistSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: {
    [getVideoList.pending]: (state, action) => {
      state.loading = true;
    },
    [getVideoList.fulfilled]: (state, action) => {
      state.loading = false;

      // const videos = action.payload.items;
      // const videoListForKids = videos.filter((video) => video.status.madeForKids === true);
      // console.log(videoListForKids);
      state.videos = action.payload.items;
      state.error = "";
    },
    [getVideoList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getChannelVideo.fulfilled]: (state, action) => {
      state.channelVideo = action.payload.items;
      state.error = "";
    },
    [getChannelVideo.rejected]: (state, action) => {
      state.error = action.payload?.message;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setLogout, updatePicture } = videolistSlice.actions;

export default videolistSlice.reducer;
