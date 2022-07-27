import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};
const namespace = 'user';
export const userSlice = createSlice({
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
        },
        subscribe: (state,action) =>{
            if(state.currentUser.subscribedUsers.includes(action.payload)){
                state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex(channelId=>{
                    return channelId === action.payload
                }),1);
            }else{
                state.currentUser.subscribedUsers.push(action.payload) 
            }
        }
    }
});

export const {loginStart, loginSuccess,loginFailure,logout,subscribe} = userSlice.actions;
export default userSlice.reducer

