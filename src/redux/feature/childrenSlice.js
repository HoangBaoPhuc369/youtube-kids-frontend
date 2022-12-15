import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../api";


// export const listChildrensUser = createAsyncThunk(
//   "children/listChildrens",
//   async ({ userOauthId, nextStep, profileCreated }, { rejectWithValue }) => {
//     try {
//       const { data } = await api.listChildrens(userOauthId);
//       if (data && profileCreated) {
//         nextStep();
//       }
//       return data;
//     } catch (err) {
//       return err.response.data;
//     }
//   }
// );

const initialState = {
  children: Cookies.get("children")
    ? JSON.parse(Cookies.get("children"))
    : null,
  listChildrens: Cookies.get("listChildrens")
    ? JSON.parse(Cookies.get("listChildrens"))
    : null,
  childrenActive: null,
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
      Cookies.remove("listChildrens");
    },
  },
  extraReducers: {
    // [listChildrensUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.listChildrens = action.payload;
    //   Cookies.set("listChildrens", JSON.stringify(action.payload));
    //   state.error = "";
    // },
    // [listChildrensUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
  
  },
});

// Action creators are generated for each case reducer function
export const { setProfileChildren, resetChildren } = childrenSlice.actions;

export default childrenSlice.reducer;
