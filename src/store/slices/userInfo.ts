import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  StoreItem, UserProfile } from "../../types/types";

let initialState: StoreItem<UserProfile[]> = {
  requestStatus: "not_initiated",
  responseStatus: "not_recieved",
  haveAnIssue: false,
  issue: "",
  data: []
};

export const UserProfileSlice = createSlice({
  name: 'UserProfile',
  initialState: initialState,
  reducers: {
    initUserProfile: (state, action: PayloadAction<StoreItem<UserProfile[]>>) => ({ ...action.payload }),
    addUserProfile: (state, action: PayloadAction<UserProfile>) => { state.data.push(action.payload) },
    updateUserProfile: (state, action: PayloadAction<UserProfile>) => {
      let index = state.data.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    removeUserProfile: (state, action: PayloadAction<string>) => { state.data = state.data.filter((item) => item._id !== action.payload) },
    resetUserProfile: (state, action: PayloadAction) => ({ ...initialState })
  }
})

export const { initUserProfile, addUserProfile, removeUserProfile, updateUserProfile, resetUserProfile } = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
