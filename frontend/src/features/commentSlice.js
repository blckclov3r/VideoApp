import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

const initialState = {
    comments: null,
    status: 'idle'
}

const namespace = 'comment';
export const createComment = createAsyncThunk(`${namespace}/createComment`, async(commentData)=>{
    const response =  await axiosInstance.post("/comments",commentData)
          .catch((err)=>{
            console.log(err);
        })
    return response?.data;
});


export const commentSlice = createSlice({
    name: namespace,
    initialState,
    reducers:{
        setComments: (state,action)=>{
            state.comments = action.payload;
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(createComment.pending,(state,action)=>{
            state.status = 'loading';
        })
        .addCase(createComment.fulfilled,(state,action)=>{
            state.status = 'success';
            state.comments = action.payload;
        })
        .addCase(createComment.rejected,(state,action)=>{
            state.status = 'error';
        })
    }
});


export const {setComments} = commentSlice.actions;

export default commentSlice.reducer;