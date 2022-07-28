import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({comment}) => {
  const [channel,setChannel] = useState(null)
  useEffect(()=>{
    const fetchComment = async () =>{
      
     await axios.get(`/users/find/${comment?.userId}`).then(res=>setChannel(res?.data))
   
    }
    fetchComment();
  },[comment.userId])



  return (

      <Container>
      <Avatar src={channel?.img ? channel?.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-SJEWBFE4t685cgNnpxFumHYvUWk_Z71-A&usqp=CAU"} />
      <Details>
        <Name>
          {channel?.name} <Date>1 day ago</Date>
        </Name>
        <Text>
          {comment?.desc}
        </Text>
      </Details>
    </Container>
  
 
  );
};

export default Comment;