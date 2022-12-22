import { configureStore } from "@reduxjs/toolkit";
import VIDEOLIST from "../redux/feature/videolistSlice";
import AUTH from "../redux/feature/authSlice";
// import CHILDREN from "../redux/feature/childrenSlice";
import SEARCH from "../redux/feature/searchSlice";
import TRACKING from "../redux/feature/trackingSlice";

export const store = configureStore({
  reducer: {
    auth: AUTH,
    video: VIDEOLIST,
    search: SEARCH,
    tracking: TRACKING,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
