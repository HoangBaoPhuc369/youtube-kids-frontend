import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
import * as api from "../api";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.getUser();

      const children = data.user.childrens;
      if (children.length === 0) {
        setTimeout(() => {
          navigate("/profile-account");
        }, 500);
      } else {
        setTimeout(() => {
          navigate("/list-profile");
        }, 500);
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
    console.log(childrenID, userId, secretPassword, nextStep);
    try {
      const { data } = await api.createSecretPasswordChildren(
        childrenID,
        userId,
        secretPassword
      );
      if (data) {
        setTimeout(() => {
          nextStep();
        }, 500);
      }
      return { data: data };
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

export const deleteSecretPasswordChildrenForParent = createAsyncThunk(
  "children/deleteSecretPasswordChildrenForParent",
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
    { childrenID, userId, videoId, channelId, thumbnail, title },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.addVideoHistory(
        childrenID,
        userId,
        videoId,
        channelId,
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
  async (
    { childId, userId, formData, navigate, defauth },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.updateChildrenProfileForParent(
        childId,
        userId,
        formData
      );
      if (data) {
        if (defauth) {
          navigate("/profile-created");
        } else {
          navigate(`/admin/parentprofilesettings/${childId}`);
        }
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

export const addVideoByParent = createAsyncThunk(
  "children/addVideoByParent",
  async (
    { childId, userId, videoId, channelId, thumbnail, title },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.addVideoByParent(
        childId,
        userId,
        videoId,
        channelId,
        thumbnail,
        title
      );
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const removeVideoByParent = createAsyncThunk(
  "children/removeVideoByParent",
  async ({ childId, userId, videoId }, { rejectWithValue }) => {
    try {
      const { data } = await api.removeVideoByParent(childId, userId, videoId);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const deleteChildByParent = createAsyncThunk(
  "children/deleteChildByParent",
  async ({ childId, userId, enough, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteChildByParent(childId, userId);
      console.log(data);
      if (enough && data.childrens.length > 0) {
        navigate(`/admin/parentprofilesettings/${data.childrens[0]._id}`);
      }
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const updateKidActivity = createAsyncThunk(
  "children/updateKidActivity",
  async ({ userId, activity }, { rejectWithValue }) => {
    console.log(activity);
    try {
      const res = await api.updateKidActivity(userId, activity);
      console.log(res);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const blockVideo = createAsyncThunk(
  "children/blockVideo",
  async ({ childId, userId, videoId }, { rejectWithValue }) => {
    try {
      const { data } = await api.blockVideo(childId, userId, videoId);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const clearBlockVideo = createAsyncThunk(
  "children/clearBlockVideo",
  async ({ childId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.clearBlockVideo(childId, userId);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const blockSearch = createAsyncThunk(
  "children/blockSearch",
  async ({ childId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.blockSearch(childId, userId);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const allowSearch = createAsyncThunk(
  "children/allowSearch",
  async ({ childId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.allowSearch(childId, userId);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const blockChat = createAsyncThunk(
  "children/blockChat",
  async ({ childId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.blockChat(childId, userId);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const allowChat = createAsyncThunk(
  "children/allowChat",
  async ({ childId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.allowChat(childId, userId);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const getKidActivity = createAsyncThunk(
  "children/getKidActivity",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.getKidActivity(userId);
      console.log(data);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  guess: null,
  childrenCreated: localStorage.getItem("childrenCreated")
    ? JSON.parse(localStorage.getItem("childrenCreated"))
    : null,
  childrenActive: null,
  childrenSelected: localStorage.getItem("childrenSelected")
    ? JSON.parse(localStorage.getItem("childrenSelected"))
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
      state.childrenSelected = null;
      localStorage.removeItem("childrenCreated");
      localStorage.removeItem("childrenSelected");
      localStorage.removeItem("user");
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
        localStorage.setItem("childrenSelected", JSON.stringify(findChildren));
      }
    },

    removeChildrenCreated: (state, action) => {
      state.childrenCreated = null;
      localStorage.removeItem("childrenCreated");
    },

    setActivityChildren: (state, action) => {
      state.user.kids_activity = [action.payload, ...state.user.kids_activity];
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.error = "";
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createSecretPassword.fulfilled]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.error = "";
    },
    [createSecretPassword.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [createChildren.fulfilled]: (state, action) => {
      state.user.childrens.push(action.payload);
      localStorage.setItem("user", JSON.stringify(state.user));
      state.childrenCreated = action.payload;
      localStorage.setItem("childrenCreated", JSON.stringify(action.payload));
      state.error = "";
    },
    [createChildren.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [createSecretPasswordChildren.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.data.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.data.children;
      state.errorChildren = "";
    },
    [createSecretPasswordChildren.rejected]: (state, action) => {
      state.errorChildren = action.payload.message;
    },

    [deleteSecretPasswordChildren.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.errorChildren = "";
    },
    [deleteSecretPasswordChildren.rejected]: (state, action) => {
      state.errorChildren = action.payload.message;
    },

    [deleteSecretPasswordChildrenForParent.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.childrenSelected = action.payload.children;
      state.errorChildren = "";
    },
    [deleteSecretPasswordChildrenForParent.rejected]: (state, action) => {
      state.errorChildren = action.payload.message;
    },

    [addVideoHistory.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.error = "";
    },
    [addVideoHistory.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [clearHistoryVideo.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));

      state.childrenActive = action.payload.children;
      state.error = "";
    },
    [clearHistoryVideo.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [updateChildrenProfileForChildren.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.error = "";
    },
    [updateChildrenProfileForChildren.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [updateChildrenProfileForParent.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.error = "";
    },
    [updateChildrenProfileForParent.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [updateContentChidlrenSettings.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.childrenActive = action.payload.children;
      state.childrenSelected = action.payload.children;
      localStorage.setItem(
        "childrenSelected",
        JSON.stringify(action.payload.children)
      );
      state.error = "";
    },
    [updateContentChidlrenSettings.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [addVideoByParent.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      if (
        state.childrenActive !== null &&
        state.childrenActive._id === action.payload.children._id
      ) {
        state.childrenActive = action.payload.children;
      }
      state.childrenSelected = action.payload.children;
      localStorage.setItem(
        "childrenSelected",
        JSON.stringify(action.payload.children)
      );
      state.error = "";
    },

    [removeVideoByParent.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      if (
        state.childrenActive !== null &&
        state.childrenActive._id === action.payload.children._id
      ) {
        state.childrenActive = action.payload.children;
      }
      state.childrenSelected = action.payload.children;
      localStorage.setItem(
        "childrenSelected",
        JSON.stringify(action.payload.children)
      );
      state.error = "";
    },

    [deleteChildByParent.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.error = "";
    },

    [updateKidActivity.fulfilled]: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.error = "";
    },

    [blockVideo.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      if (
        state.childrenActive !== null &&
        state.childrenActive._id === action.payload.children._id
      ) {
        state.childrenActive = action.payload.children;
      }
      state.error = "";
    },

    [clearBlockVideo.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      if (
        state.childrenActive !== null &&
        state.childrenActive._id === action.payload.children._id
      ) {
        state.childrenActive = action.payload.children;
      }
      state.error = "";
    },

    [blockSearch.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      if (
        state.childrenActive !== null &&
        state.childrenActive._id === action.payload.children._id
      ) {
        state.childrenActive = action.payload.children;
      }
      state.error = "";
    },

    [allowSearch.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      if (
        state.childrenActive !== null &&
        state.childrenActive._id === action.payload.children._id
      ) {
        state.childrenActive = action.payload.children;
      }
      state.error = "";
    },

    [blockChat.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      if (
        state.childrenActive !== null &&
        state.childrenActive._id === action.payload.children._id
      ) {
        state.childrenActive = action.payload.children;
      }
      state.error = "";
    },

    [allowChat.fulfilled]: (state, action) => {
      state.user.childrens = action.payload.childrens;
      localStorage.setItem("user", JSON.stringify(state.user));
      if (
        state.childrenActive !== null &&
        state.childrenActive._id === action.payload.children._id
      ) {
        state.childrenActive = action.payload.children;
      }
      state.error = "";
    },

    [getKidActivity.fulfilled]: (state, action) => {
      state.user.kids_activity = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.error = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  Logout,
  setChildrenActive,
  setChildrenSelect,
  removeChildrenCreated,
  setActivityChildren,
} = authSlice.actions;

export default authSlice.reducer;
