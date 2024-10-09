import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  Profile, StoreItem,} from "../../types/types";

let initialState:StoreItem<Profile|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}
export const ProfileSlice=createSlice({
    name:'Profile',
    initialState:initialState,
    reducers:{
        initProfile:(state,action:PayloadAction<StoreItem<Profile>>)=>({...action.payload}),
        setProfile:(state,action:PayloadAction<Profile>)=>{state.data=action.payload},
        resetProfile:(state,action:PayloadAction)=>({...initialState})

    }
});

export const {initProfile,setProfile,resetProfile}=ProfileSlice.actions;
export default ProfileSlice.reducer;