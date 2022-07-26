import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};
const namespace = 'video';
export const videoSlice = createSlice({
    initialState,
    name: namespace,
    reducers: {
        loginStart: (state,action)=>{
            state.loading = true;
        },
        loginSuccess: (state,action)=>{
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state,action)=>{
            state.loading = false;
            state.error = true;
        },
        logout: (state,action) =>{
            return initialState;
        }
    }
});

export const {loginStart, loginSuccess,loginFailure,logout} = videoSlice.actions;
export default videoSlice.reducer

