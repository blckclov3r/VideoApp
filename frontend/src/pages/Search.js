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

    const {data:videos, isLoading,status} = useQuery(['SEARCH/FETCHVIDEOS',query],fetchVideos,{
      refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: Infinity,
  cacheTime: Infinity
    });

    if(status === 'error'){
      return (
        <>
         <h2 style={{color: '#ccc'}}>Something went wrong</h2>
         <a href="https://facebook.com/blckclov3r" style={{color: "#f1f1f1",textDecoration: 'none'}}>Need help? add me on Facebook @blckclov3r</a>
        </>
      )
    }
  
    if( isLoading){
      return (
        <h2 style={{color: '#ccc'}}>Loading...</h2>
      )
    }



  return (
    <Container>

    {!isLoading && videos?.map(video=>(
      <Card key={video._id} video={video}/>
    ))}

   
  </Container>
  )
}
