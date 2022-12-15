import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../api";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.getUser();
      const childrens = await api.listChildrens(data.user.google_id);
      const children = childrens.data;
      if (children.length === 0) {
        navigate("/profile-account");
      } else {
        const listProfilePage = `/list-profile/${data.user.google_id}`;
        Cookies.set("listChildrens", JSON.stringify(childrens.data));
        navigate(listProfilePage);
      }
      return data.user;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const createSecretPassword = createAsyncThunk(
  "auth/createSecretPassword",
  async ({ userId, secretPassword }, { rejectWithValue }) => {
    try {
      const { data } = await api.createSecretPassword(userId, secretPassword);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const createChildren = createAsyncThunk(
  "children/createChildren",
  async ({ formData, userOauthId, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.createChildren(formData, userOauthId);
      if (data) {
        navigate("/profile-created");
      }
      return { data: data, formData: formData };
    } catch (err) {
      return err.response.data;
    }
  }
);

export const createSecretPasswordChildren = createAsyncThunk(
  "children/createSecretPasswordChildren",
  async ({ childrenID, userId, secretPassword }, { rejectWithValue }) => {
    try {
      const { data } = await api.createSecretPasswordChildren(
        childrenID,
        userId,
        secretPassword
      );
      return { data: data, childrenID: childrenID };
    } catch (err) {
      return err.response.data;
    }
  }
);

export const addVideoHistory = createAsyncThunk(
  "children/addVideoHistory",
  async (
    { childrenID, userId, videoId, thumbnail, title },
    { rejectWithValue }
  ) => {
    console.log(childrenID, videoId, thumbnail, title);
    try {
      const { data } = await api.addVideoHistory(
        childrenID,
        userId,
        videoId,
        thumbnail,
        title
      );
      return { data: data, childrenID: childrenID };
    } catch (err) {
      return err.response.data;
    }
  }
);

export const clearHistoryVideo = createAsyncThunk(
  "children/clearHistoryVideo",
  async ({ childrenID, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.clearVideoHistory(childrenID, userId);
      return { data: data, childrenID: childrenID };
    } catch (err) {
      return err.response.data;
    }
  }
);

export const updateChildrenProfileForChildren = createAsyncThunk(
  "children/updateChildrenProfileForChildren",
  async ({ childId, userId, name, picture }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateChildrenProfileForChildren(
        childId,
        userId,
        name,
        picture
      );
      return { data: data, childrenID: childId };
    } catch (err) {
      return err.response.data;
    }
  }
);

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  guess: null,
  childrenCreated: Cookies.get("childrenCreated")
    ? JSON.parse(Cookies.get("childrenCreated"))
    : null,
  childrenActive: null,
  error: "",
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Logout: (state) => {
      state.user = null;
      Cookies.remove("user");
    },

    setChildrenActive: (state, action) => {
      state.childrenActive = action.payload;
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
      state.error = "";
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createSecretPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
      state.error = "";
    },
    [createSecretPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createChildren.pending]: (state, action) => {
      state.childrenCreated.loading = true;
    },
    [createChildren.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      Cookies.set("user", JSON.stringify(state.user));
      state.childrenCreated = action.payload.formData;
      Cookies.set("childrenCreated", JSON.stringify(state.childrenCreated));
      state.error = "";
    },
    [createChildren.rejected]: (state, action) => {
      state.childrenCreated.loading = false;
      state.childrenCreated.error = action.payload.message;
    },

    [createSecretPasswordChildren.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      Cookies.set("user", JSON.stringify(state.user));
      const findChildren = state.user.childrens.find(
        (child) => child._id === action.payload.childrenID
      );
      if (findChildren) {
        state.childrenActive = findChildren;
      }
      state.errorChildren = "";
    },
    [createSecretPasswordChildren.rejected]: (state, action) => {
      state.errorChildren = action.payload.message;
    },

    [addVideoHistory.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      Cookies.set("user", JSON.stringify(state.user));
      const findChildren = state.user.childrens.find(
        (child) => child._id === action.payload.childrenID
      );
      if (findChildren) {
        state.childrenActive = findChildren;
      }
      state.error = "";
    },
    [addVideoHistory.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [clearHistoryVideo.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      Cookies.set("user", JSON.stringify(state.user));
      const findChildren = state.user.childrens.find(
        (child) => child._id === action.payload.childrenID
      );
      if (findChildren) {
        state.childrenActive = findChildren;
      }
      state.error = "";
    },
    [clearHistoryVideo.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [updateChildrenProfileForChildren.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      Cookies.set("user", JSON.stringify(state.user));
      const findChildren = state.user.childrens.find(
        (child) => child._id === action.payload.childrenID
      );
      if (findChildren) {
        state.childrenActive = findChildren;
      }
      state.error = "";
    },
    [updateChildrenProfileForChildren.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { Logout, setChildrenActive } = authSlice.actions;

export default authSlice.reducer;
