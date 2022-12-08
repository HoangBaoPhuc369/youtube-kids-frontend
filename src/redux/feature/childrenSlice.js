import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../api";

export const createChildren = createAsyncThunk(
  "children/createChildren",
  async ({ formData, userOauthId, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.createChildren(formData, userOauthId);
      if (data) {
        navigate("/profile-created");
      }
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const listChildrensUser = createAsyncThunk(
  "children/listChildrens",
  async ({ userOauthId, nextStep, profileCreated }, { rejectWithValue }) => {
    try {
      const { data } = await api.listChildrens(userOauthId);
      if (data && profileCreated) {
        nextStep();
      }
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const addVideoHistory = createAsyncThunk(
  "children/addVideoHistory",
  async ({ childrenID, videoId, thumbnail, title }, { rejectWithValue }) => {
    try {
      const { data } = await api.addVideoHistory(
        childrenID,
        videoId,
        thumbnail,
        title
      );
      return data.historyWatchVideo;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const getChildren = createAsyncThunk(
  "children/getChildren",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.getChildren(id);
      if (data) {
        navigate("/");
      }
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const updateChildrenProfileForChildren = createAsyncThunk(
  "children/updateChildrenProfileForChildren",
  async ({ name, picture, id }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateChildrenProfileForChildren(
        name,
        picture,
        id
      );
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const clearHistoryVideo = createAsyncThunk(
  "children/clearHistoryVideo",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.clearHistoryVideo(id);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

const initialState = {
  children: Cookies.get("children")
    ? JSON.parse(Cookies.get("children"))
    : null,
  listChildrens: Cookies.get("listChildrens")
    ? JSON.parse(Cookies.get("listChildrens"))
    : null,
  childrenActive: Cookies.get("childrenActive")
    ? JSON.parse(Cookies.get("childrenActive"))
    : null,
  error: "",
  loading: false,
  loadingChildren: false,
  errorChildren: "",
};

export const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {
    resetChildren: (state) => {
      state.children = null;
      state.listChildrens = null;
      state.childrenActive = null;
      Cookies.remove("children");
      Cookies.remove("childrenActive");
      Cookies.remove("listChildrens");
    },
  },
  extraReducers: {
    [createChildren.pending]: (state, action) => {
      state.loading = true;
    },
    [createChildren.fulfilled]: (state, action) => {
      state.loading = false;
      state.children = action.payload;
      Cookies.set("children", JSON.stringify(action.payload));
      state.error = "";
    },
    [createChildren.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [listChildrensUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.listChildrens = action.payload;
      Cookies.set("listChildrens", JSON.stringify(action.payload));
      state.error = "";
    },
    [listChildrensUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [addVideoHistory.fulfilled]: (state, action) => {
      state.loading = false;
      state.childrenActive.historyWatchVideo = action.payload;
      state.error = "";
    },
    [addVideoHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getChildren.pending]: (state, action) => {
      state.loadingChildren = true;
    },
    [getChildren.fulfilled]: (state, action) => {
      state.loadingChildren = false;
      state.childrenActive = action.payload;
      Cookies.set("childrenActive", JSON.stringify(action.payload));
      state.errorChildren = "";
    },
    [getChildren.rejected]: (state, action) => {
      state.loadingChildren = false;
      state.errorChildren = action.payload.message;
    },

    [updateChildrenProfileForChildren.fulfilled]: (state, action) => {
      state.childrenActive = action.payload;
      state.errorChildren = "";
    },
    [updateChildrenProfileForChildren.rejected]: (state, action) => {
      state.errorChildren = action.payload.message;
    },

    [clearHistoryVideo.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.errorChildren = "";
    },
    [clearHistoryVideo.rejected]: (state, action) => {
      state.errorChildren = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileChildren, resetChildren } = childrenSlice.actions;

export default childrenSlice.reducer;
