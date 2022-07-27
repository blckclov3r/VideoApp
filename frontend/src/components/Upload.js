import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #0000007a;
    align-items: center;
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background: ${({theme})=>theme.bgLighter};
    color: ${({theme})=>theme.text};
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    z-index: 999;
`

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
 
`

const Title = styled.h1`
    text-align: center;
`

const Input = styled.input`
    border: 1px solid ${({theme})=>theme.soft}
    color: ${({theme})=>theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`
const Desc = styled.textarea`
    border: 1px solid ${({theme})=>theme.soft};
    color: ${({theme})=>theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
border: 1px solid ${({theme})=>theme.soft};
color: ${({theme})=>theme.text};
`

const Label = styled.label`
font-size: 14px;
`


export const Upload = ({setOpen}) => {
  return (
   <Container>
    <Wrapper>
        <Close onClick={()=>setOpen(false)}>X</Close>
        <Title>Upload a video</Title>
        <Label>Video:</Label>
        <Input type="file" accept="video/*" />
        <Input type="text" placeholder="Title" />
        <Desc type="text" placeholder="Title" rows={8} />
        <Input type="text" placeholder="Separate the tags with commas." />
        <Label>Image:</Label>
        <Input type="file" accept="image/*" />
        <Button>Upload</Button>
    </Wrapper>
   </Container>
  )
}
