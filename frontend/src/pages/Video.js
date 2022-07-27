import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Card from "../components/Card";
import Comments from "../components/Comments";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { dislike, fetchSuccess, like } from "../features/videoSlice";
import { formatDistanceToNow } from "date-fns";
import { subscribe } from "../features/userSlice";

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Content = styled.div`
  flex: 10;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 1;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 520px;
  width: 100%;
  object-fit: cover;
`

const Video = () => {

  const {currentVideo} = useSelector(state=>state.video);
  const {currentUser} = useSelector(state=>state.user);

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2]

  const [channel,setChannel] = useState(null)

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        // console.log(videoRes?.data)
        const channelRes = await axios.get(`/users/find/${videoRes?.data.userId}`)
        dispatch(fetchSuccess(videoRes?.data))
        setChannel(channelRes?.data)
        // console.log('channel',channelRes?.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[path,dispatch]);


  // console.log('currentVideo',currentVideo?.videoUrl)

  const handleLike = async() =>{
    await axios.put(`/users/like/${currentVideo._id}`)
    .then((res)=>console.log(res))
    dispatch(like(currentUser._id));
  }

  const handleDislike = async() =>{
    await axios.put(`/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id));
  }

  // console.log(currentUser?.subscribedUsers.includes(channel?._id))

  const handleSubscribe = async()=>{
    if(currentUser?.subscribedUsers?.includes(channel._id)){
      await axios.put(`/users/subscribe/${channel?._id}`).then(res=>console.log(res?.data))
    }else{

      await axios.put(`/users/unsubscribe/${channel?._id}`).then(res=>console.log(res?.data));
   
    }
    dispatch(subscribe(channel?._id))
  }
  
  // console.log('channel',channel)
  return (
    <Container>
      <Content>
        <VideoWrapper>
          
          <VideoFrame src={currentVideo?.videoUrl} />


        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • {formatDistanceToNow(new Date(currentVideo?.createdAt), { addSuffix: true })}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser._id) ? <ThumbUpIcon /> :  <ThumbUpOutlinedIcon />}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDownIcon /> :  <ThumbDownOffAltOutlinedIcon />}
             Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>
                {channel?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={channel && handleSubscribe}>{currentUser.subscribedUsers.includes(channel?._id) ? 'SUBSCRIBE' : 'UNSBSCRIBE' }</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation>
        {/* <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/> */}
      </Recommendation>
    </Container>
  );
};

export default Video;