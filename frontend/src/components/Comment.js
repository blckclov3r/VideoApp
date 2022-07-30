import styled from "styled-components";
import { axiosInstance } from "../config";
import {useQuery} from 'react-query'
import { formatDistance } from "date-fns";

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

const DateStyle = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({comment,user}) => {
  

  const fetchUser = async () =>{
    const response = await axiosInstance.get(`/users/find/${comment.userId}`);
    return response?.data;
  }

  const { data: channel } = useQuery(['COMMENT/FETCHUSER', comment], fetchUser,{
    refetchOnWindowFocus: false,
    keepPreviousData: false,
  });



const timestamp = comment.createdAt ? new Date(comment.createdAt) : "";
const distance = formatDistance(Date.now(), timestamp, {addSuffix: true });

  return (

      <Container>
         <Avatar src={channel?.img || user?.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-SJEWBFE4t685cgNnpxFumHYvUWk_Z71-A&usqp=CAU"} alt="user" />
      <Details>
        <Name> {channel?.name || user?.name}  <DateStyle>{distance.substring(distance.indexOf(distance.match(/\d+/g)))}</DateStyle> </Name>
   
        <Text>
          {comment?.desc}
        </Text>
      </Details>
    </Container>
  
 
  );
};

export default Comment;