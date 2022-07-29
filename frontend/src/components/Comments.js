import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { axiosInstance } from "../config";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 4px;
  font-size: 14px;
  margin-left: auto;
  display: flex;
  margin-bottom: 1rem;
`

const Comments = ({videoId}) => {

  const {currentUser} = useSelector(state=>state.user);
  const [comments, setComments] = useState(null);

  const [commentInput,setCommentInput] = useState("");

  useEffect(() => {
    const fetchComments = async()=>{
      try {
         const commentRes = await axiosInstance.get(`/comments/${videoId}`)
         setComments(commentRes?.data)

      } catch (error) {
         console.log('fetchComments',error);
      }
    }
    fetchComments();
  }, [videoId]);

  // console.log(comments)

  const commentSubmit = async(e) =>{
    e.preventDefault();


    await axiosInstance.post("/comments",{
      userId: currentUser?._id,
      videoId,
      desc: commentInput
    }).then(res=> console.log(res))
    .catch((err)=>{
      console.log(err);
    })

  }


  return (
    <Container>
          <form onSubmit={commentSubmit}>
      <NewComment>
        <Avatar src={currentUser && (currentUser.img !== "" || currentUser.img !== null) ? currentUser.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-SJEWBFE4t685cgNnpxFumHYvUWk_Z71-A&usqp=CAU"} />
        <Input placeholder="Add a comment..."  value={commentInput} onChange={(e)=>setCommentInput(e.target.value)}/>
 
      </NewComment>
      <Button type="submit">Comment</Button>
      </form>
      {comments && comments?.map(comment=>{
        return <Comment key={comment?._id} comment={comment} />
      })}
  

    </Container>
  );
};

export default Comments;