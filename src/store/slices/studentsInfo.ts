import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StudentProfile, StoreItem } from "../../types/types";

let initialState: StoreItem<StudentProfile[]> = {
  requestStatus: "not_initiated",
  responseStatus: "not_recieved",
  haveAnIssue: false,
  issue: "",
  data: []
};

export const StudentProfileSlice = createSlice({
  name: 'StudentProfile',
  initialState: initialState,
  reducers: {
    initStudentProfile: (state, action: PayloadAction<StoreItem<StudentProfile[]>>) => ({ ...action.payload }),
    addStudentProfile: (state, action: PayloadAction<StudentProfile>) => { state.data.push(action.payload) },
    updateStudentProfile: (state, action: PayloadAction<StudentProfile>) => {
      let index = state.data.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    removeStudentProfile: (state, action: PayloadAction<string>) => { state.data = state.data.filter((item) => item._id !== action.payload) },
    resetStudentProfile: (state, action: PayloadAction) => ({ ...initialState })
  }
})

export const { initStudentProfile, addStudentProfile, removeStudentProfile, updateStudentProfile, resetStudentProfile } = StudentProfileSlice.actions;
export default StudentProfileSlice.reducer;
