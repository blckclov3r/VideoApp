import Card from "../components/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 1;
`

export default function Home({type}) {

  const [videos,setVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () =>{
      const response = await axios.get(`/videos/${type}`);
      setVideos(response?.data);
    }
    fetchVideos();
  }, [type]);
   console.log(videos)

  return (
    <Container>
       {
        videos?.map((video)=>(
          <Card video={video} type={type}  key={video._id} />
        ))
       }
     
    </Container>
  )
}
