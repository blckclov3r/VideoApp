import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import {  useQuery } from 'react-query'
import { axiosInstance } from "../config";

const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,minmax(270px,1fr));
grid: 1rem;
grid-column-gap: 1rem;
`;
export default function Search() {
    const query = useLocation().search;

    const fetchVideos = async () =>{
        return  await axiosInstance.get(`/videos/search/${query}`)
        .then(res=>res?.data)
        .catch((err)=>{
          console.log(err)
        });
      }

    const {data:videos} = useQuery(['SEARCH/FETCHVIDEOS',query],fetchVideos);

  return (
    <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>
  )
}
