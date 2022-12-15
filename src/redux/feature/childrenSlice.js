import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../api";

// export const createChildren = createAsyncThunk(
//   "children/createChildren",
//   async ({ formData, userOauthId, navigate }, { rejectWithValue }) => {
//     try {
//       const { data } = await api.createChildren(formData, userOauthId);
//       if (data) {
//         navigate("/profile-created");
//       }
//       return data;
//     } catch (err) {
//       return err.response.data;
//     }
//   }
// );

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


// export const getChildren = createAsyncThunk(
//   "children/getChildren",
//   async ({ id, userId, navigate }, { rejectWithValue }) => {
//     try {
//       const { data } = await api.getChildren(id, userId);
//       if (data) {
//         navigate("/");
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
    // [createChildren.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [createChildren.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.children = action.payload;
    //   Cookies.set("children", JSON.stringify(action.payload));
    //   state.error = "";
    // },
    // [createChildren.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },

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
export const { setProfileChildren, resetChildren } = childrenSlice.actions;

export default childrenSlice.reducer;
