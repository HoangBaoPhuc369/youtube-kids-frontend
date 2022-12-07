import { configureStore } from "@reduxjs/toolkit";
import VIDEOLIST from "../redux/feature/videolistSlice";
import AUTH from "../redux/feature/authSlice";
import CHILDREN from "../redux/feature/childrenSlice";

export const store = configureStore({
  reducer: {
    auth: AUTH,
    children: CHILDREN,
    video: VIDEOLIST,
  },
});
