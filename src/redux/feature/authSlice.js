import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../api";

// export const loginOauth2 = createAsyncThunk("auth/LoginOauth2", async () => {
//   try {
//     const { data } = await api.loginOauth2();
//     return data;
//   } catch (err) {
//     return err.response.data;
//   }
// });

export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.getUser();
      if (data.user) {
        navigate("/profile-account");
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
  reducers: {},
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
// export const { setLogout, updatePicture } = authSlice.actions;

export default authSlice.reducer;
