import Card from "../components/Card";
import styled from "styled-components";
import { useQuery } from 'react-query'
import { axiosInstance } from "../config";

const Container = styled.div`
     display: grid;
     grid-template-columns: repeat(auto-fill,minmax(270px,1fr));
     grid: 1rem;
    grid-column-gap: 1rem;
`

export default function Home({ type='random' }) {


  const fetchVideos = async () => {
    return await axiosInstance.get(`/videos/${type}`)
      .then(res => res?.data)
      .catch((err) => {
        console.log(err?.response?.data?.status);
      });
  }

  const { data, isLoading,status} = useQuery(['HOME/FETCHVIDEOS', type], fetchVideos,{
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if( status === 401 || status === 'error'){
    return (
      <>
       <h2 style={{color: '#ccc'}}>Something went wrong or Not authenticated</h2>
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
      {
        data && data?.map((video) => (
          <Card video={video} type={type} key={video._id} />
        ))
      }
    </Container>
  )
}
