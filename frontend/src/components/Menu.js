import React from 'react'
import styled from 'styled-components';



const Container = styled.div`
    flex: 1;
    background-color: #202020;
    height: 100vh;
    color: #fff;
`
const Wrapper = styled.div`
    padding: 1.1rem 1.6rem;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
const Img = styled.img`
  height: 25px;
`

export default function Menu() {
  return (
    <Container>
        <Wrapper>
          <Logo>
            <Img src="" alt="logo" />
          </Logo>
        </Wrapper>
    </Container>
  )
}
