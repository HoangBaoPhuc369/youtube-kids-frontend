import { configureStore } from "@reduxjs/toolkit";
import VIDEOLIST from "../redux/feature/videolistSlice";
import AUTH from "../redux/feature/authSlice";


export const store = configureStore({
  reducer: {
    auth: AUTH,
    video: VIDEOLIST,
  },
});
