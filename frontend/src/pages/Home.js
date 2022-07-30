import Card from "../components/Card";
import styled from "styled-components";
import { useEffect } from "react";
import { setVideoType } from "../features/videoSlice";

const Container = styled.div`
     display: grid;
     grid-template-columns: repeat(auto-fill,minmax(270px,1fr));
     grid: 1rem;
    grid-column-gap: 1rem;
`

export default function Home({ type='random', data,isLoading,status,dispatch }) {

  useEffect(()=>{
    dispatch(setVideoType(type))
  },[type,dispatch])

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
        (data !== undefined || data !== null) && data?.map((video) => (
          <Card video={video} type={type} key={video._id} />
        ))
      }
    </Container>
  )
}
