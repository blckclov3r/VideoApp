import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentVideo: null,
    loading: false,
    error: false,
};
const namespace = 'video';
export const videoSlice = createSlice({
    initialState,
    name: namespace,
    reducers: {
        fetchStart: (state,action)=>{
            state.loading = true;
        },
        fetchSuccess: (state,action)=>{
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchFailure: (state,action)=>{
            state.loading = false;
            state.error = true;
        },
        like: (state,action)=>{
            console.log('like',action.payload)
            if(!state.currentVideo.likes.includes(action.payload)){
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex(userId=>{
                    return userId === action.payload
                }),1)
            }
        },
        dislike: (state,action)=>{
            console.log('like',action.payload)
            if(!state.currentVideo.dislikes.includes(action.payload)){
                state.currentVideo.dislikes.push(action.payload);
                state.currentVideo.likes.splice(state.currentVideo.likes.findIndex(userId=>{
                    return userId === action.payload
                }),1)
            }
        }
    }
});

export const {fetchStart, fetchSuccess,fetchFailure,like,dislike} = videoSlice.actions;
export default videoSlice.reducer

