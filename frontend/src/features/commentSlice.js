import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

const initialState = {
    comments: [],
    status: 'idle'
}

const namespace = 'comment';

export const createComment = createAsyncThunk(`${namespace}/createComment`, async(commentData)=>{
    return await axiosInstance.post("/comments",commentData)
        .then((res)=>{
            return res?.data;
        })
          .catch((err)=>{
            console.log('createComment',err);
        }) 
});


export const fetchComments = createAsyncThunk(`${namespace}/fetchComments`, async(videoId)=>{
    return await axiosInstance.get(`/comments/${videoId}`)
        .then((res)=>{
            return res?.data;
        })
          .catch((err)=>{
            console.log('fetchComments',err);
        }) 
});

export const commentSlice = createSlice({
    name: namespace,
    initialState,
    reducers:{
        setComments: (state,action)=>{
            state.comments = [action.payload,...state.comments];
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(createComment.pending,(state,action)=>{
            state.status = 'loading';
        })
        .addCase(createComment.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.comments.push(action.payload);
        })
        .addCase(createComment.rejected,(state,action)=>{
            state.status = 'error';
        })
        .addCase(fetchComments.pending,(state,action)=>{
            state.status = 'loading';
        })
        .addCase(fetchComments.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.comments = action.payload;
        })
        .addCase(fetchComments.rejected,(state,action)=>{
            state.status = 'error';
        })
    }
});


export const {setComments} = commentSlice.actions;

export default commentSlice.reducer;