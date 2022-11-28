import { configureStore } from "@reduxjs/toolkit";
import VIDEOLIST from "../redux/feature/videolistSlice";

export const store = configureStore({
  reducer: {
    video: VIDEOLIST,
  },
});
