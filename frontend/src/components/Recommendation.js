import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../config";
import Card from "./Card";

const Container = styled.div`
  flex: 3;
`;

export default function Recommendation({ tags }) {
    const [videos, setVideos] = useState(null);

    useEffect(() => {
      const fetchVideos = async () => {
        const res = await axiosInstance.get(`/videos/tags?tags=${tags}`);
        setVideos(res?.data);
      };
      fetchVideos();
    }, [tags]);
  return (
    <Container>
    {videos?.map((video) => (
      <Card type="sm" key={video?._id} video={video} />
    ))}
  </Container>
  )
}
