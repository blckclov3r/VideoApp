import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config";

const Container = styled.div`
    margin-bottom: 45px;
    cursor: pointer;
    padding: 10px;
    
`;

const Image = styled.img`
    width: 100%;
    height: 190px;
    background: #f1f1f1;
    border-radius: 4px;
    border: none;
    box-shadow: 0 .125rem .0rem rgba(0,0,0,.075) !important;
`

const Details = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 12px;
`

const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #ccc;
    
`

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 5px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;


export default function Card({type,video}) {

  const [channel,setChannel] = useState(null);

  useEffect(() => {
    const fetchUser = async () =>{
      const response = await axiosInstance.get(`/users/find/${video?.userId}`);
      setChannel(response?.data);
    }
    fetchUser();
  }, [video?.userId]);

  // console.log(channel)
  // console.log(video)

  const replaceImage = (error) => {
    //replacement of broken Image
    error.onerror = "";
    error.target.src = "https://i.ytimg.com/vi/8Ze0b2VvwHQ/maxresdefault.jpg"
    return true;
  }

  return (
    <Link to={`/video/${video?._id}`} style={{textDecoration: 'none'}}>
        <Container type={type}>
                <Image src={video?.imgUrl} alt="Video" onError={replaceImage} />
                <Details type={type}>
                    <ChannelImage src={channel?.img} />
                    <Texts>
                <Title>{video?.title}</Title>
                <ChannelName>{channel?.name}</ChannelName>
                <Info>{video?.views} views •  {video && formatDistanceToNow(new Date(video?.createdAt), { addSuffix: true })}</Info>
            </Texts>
                </Details>
        </Container>
    </Link>
  )
}
