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
  async ({ userOauthId, nextStep }, { rejectWithValue }) => {
    try {
      const { data } = await api.listChildrens(userOauthId);
      if (data) {
        console.log(data);
        nextStep();
      }
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
  error: "",
  loading: false,
};

export const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {},
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
  },
});

// Action creators are generated for each case reducer function
// export const { setLogout, updatePicture } = childrenSlice.actions;

export default childrenSlice.reducer;
