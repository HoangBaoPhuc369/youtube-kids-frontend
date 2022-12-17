import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../api";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.getUser();

      const children = data.user.childrens;
      if (children.length === 0) {
        navigate("/profile-account");
      } else {
        const listProfilePage = `/list-profile/${data.user.google_id}`;
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
  async ({ userId, password, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.createSecretPassword(userId, password);
      if (data) {
        navigate("/admin");
      }
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const createChildren = createAsyncThunk(
  "children/createChildren",
  async ({ formData, userOauthId, navigate, admin }, { rejectWithValue }) => {
    try {
      const { data } = await api.createChildren(formData, userOauthId);
      if (data) {
        if (admin) {
          navigate(`/admin/parentprofilesettings/${data._id}`);
        } else {
          navigate("/profile-created");
        }
      }
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const createSecretPasswordChildren = createAsyncThunk(
  "children/createSecretPasswordChildren",
  async (
    { childrenID, userId, secretPassword, nextStep },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.createSecretPasswordChildren(
        childrenID,
        userId,
        secretPassword
      );
      return { data: data, nextStep };
    } catch (err) {
      return err.response.data;
    }
  }
);

export const deleteSecretPasswordChildren = createAsyncThunk(
  "children/deleteSecretPasswordChildren",
  async ({ childrenID, userId, secretPassword }, { rejectWithValue }) => {
    try {
      const { data } = await api.createSecretPasswordChildren(
        childrenID,
        userId,
        secretPassword
      );
      return data;
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
      return data;
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
      return data;
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
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const updateChildrenProfileForParent = createAsyncThunk(
  "children/updateChildrenProfileForParent",
  async ({ childId, userId, formData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateChildrenProfileForParent(
        childId,
        userId,
        formData
      );
      if (data) {
        navigate(`/admin/parentprofilesettings/${childId}`);
      }
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const updateContentChidlrenSettings = createAsyncThunk(
  "children/updateContentChidlrenSettings",
  async (
    { childrenID, userId, contentSetting, navigate },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.updateContentChidlrenSettings(
        childrenID,
        userId,
        contentSetting
      );
      if (data) {
        navigate(`/admin/parentprofilesettings/${childrenID}`);
      }
      return data;
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
  childrenSelected: Cookies.get("childrenSelected")
    ? JSON.parse(Cookies.get("childrenSelected"))
    : null,
  error: "",
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Logout: (state) => {
      state.user = null;
      state.childrenActive = null;
      state.childrenCreated = null;
      Cookies.remove("childrenCreated");
      Cookies.remove("user");
    },

    setChildrenActive: (state, action) => {
      state.childrenActive = action.payload;
    },

    setChildrenSelect: (state, action) => {
      const findChildren = state.user.childrens.find(
        (child) => child._id === action.payload
      );
      if (findChildren) {
        state.childrenSelected = findChildren;
        Cookies.set("childrenSelected", JSON.stringify(findChildren));
      }
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
      state.user = action.payload;
      state.error = "";
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createSecretPassword.fulfilled]: (state, action) => {
      Cookies.set("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.error = "";
    },
    [createSecretPassword.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [createChildren.fulfilled]: (state, action) => {
      state.user.childrens.push(action.payload);
      Cookies.set("user", JSON.stringify(state.user));
      state.childrenCreated = action.payload;
      Cookies.set("childrenCreated", JSON.stringify(action.payload));
      state.error = "";
    },
    [createChildren.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [createSecretPasswordChildren.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.data.childrens;
      Cookies.set("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.data.children;
      action.payload.nextStep();

      state.errorChildren = "";
    },
    [createSecretPasswordChildren.rejected]: (state, action) => {
      state.errorChildren = action.payload.message;
    },

    [deleteSecretPasswordChildren.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      Cookies.set("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.errorChildren = "";
    },
    [deleteSecretPasswordChildren.rejected]: (state, action) => {
      state.errorChildren = action.payload.message;
    },

    [addVideoHistory.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      Cookies.set("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.error = "";
    },
    [addVideoHistory.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [clearHistoryVideo.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      Cookies.set("user", JSON.stringify(state.user));

      state.childrenActive = action.payload.children;
      state.error = "";
    },
    [clearHistoryVideo.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [updateChildrenProfileForChildren.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      Cookies.set("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.error = "";
    },
    [updateChildrenProfileForChildren.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [updateChildrenProfileForParent.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      Cookies.set("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.error = "";
    },
    [updateChildrenProfileForParent.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [updateContentChidlrenSettings.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      Cookies.set("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.childrenSelected = action.payload.children;
      Cookies.set("childrenSelected", JSON.stringify(action.payload.children));
      state.error = "";
    },
    [updateContentChidlrenSettings.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { Logout, setChildrenActive, setChildrenSelect } =
  authSlice.actions;

export default authSlice.reducer;
