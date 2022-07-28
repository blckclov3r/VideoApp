import Card from "../components/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
     display: grid;
     grid-template-columns: repeat(auto-fill,minmax(270px,1fr));
     grid: 1rem;
    grid-column-gap: 1rem;
`

export default function Home({type}) {

  const [videos,setVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () =>{
      await axios.get(`/videos/${type}`)
        .then((res)=>{
          setVideos(res?.data);
        }).catch((err)=>{
          console.log(err)
        })
    }
    fetchVideos();
  }, [type]);


  return (
    <Container>
       { 
         Array.isArray(videos) && videos?.map((video)=>(
          <Card video={video} type={type}  key={video._id} />
         ))
       }
    </Container>
  )
}
