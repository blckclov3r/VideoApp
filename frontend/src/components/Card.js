import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    width: 300px;
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


export default function Card() {
  return (
    <Link to="/video" style={{textDecoration: 'none'}}>
        <Container>
                <Image src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640" />
                <Details>
                    <ChannelImage />
                    <Texts>
                <Title>Test Video</Title>
                <ChannelName>Blckclov3r</ChannelName>
                <Info>660,908 views • 1 day ago</Info>
            </Texts>
                </Details>
        </Container>
    </Link>
  )
}
