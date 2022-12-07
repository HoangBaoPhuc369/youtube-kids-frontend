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

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
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
  },
});

// Action creators are generated for each case reducer function
export const { Logout } = authSlice.actions;

export default authSlice.reducer;
