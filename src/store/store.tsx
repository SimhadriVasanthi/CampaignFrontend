import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./slices/popupSlice";
import ProfileSlice from "./slices/profileInfo";
import studentsInfo from "./slices/studentsInfo";
import userAuthSlice from "./slices/userAuthSlice";
import usersInfo from "./slices/userInfo";

export const store = configureStore({
  reducer: {
    userAuthStatus: userAuthSlice,
    profileInfo: ProfileSlice,
    studentInfo: studentsInfo,
    popup:popupSlice,
    userInfo: usersInfo,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
