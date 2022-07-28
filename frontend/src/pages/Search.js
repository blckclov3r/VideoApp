import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,minmax(270px,1fr));
grid: 1rem;
grid-column-gap: 1rem;
`;
export default function Search() {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    // console.log(useLocation())
  
    useEffect(() => {
      const fetchVideos = async () => {
        const res = await axios.get(`/videos/search${query}`);
        setVideos(res.data);
      };
      fetchVideos();
    }, [query]);
  return (
    <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>
  )
}
