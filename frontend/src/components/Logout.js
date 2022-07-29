import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { logout } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
export default function Logout({setLogoutModal}) {
    const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #0000007a;
    align-items: center;
    display: flex;
    justify-content: center;
    
`

const Wrapper = styled.div`

    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    box-shadow: 0 .125rem .0rem rgba(0,0,0,.075) !important;
    z-index: 9999;
`

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: red;
    font-size: 2rem;
`

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;

cursor: pointer;
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
background: ${({ theme }) => theme.bgLighter};
&:hover{
    background: ${({ theme }) => theme.bg};
}
`
const dispatch = useDispatch();
const navigate = useNavigate();

 const handleLogout = () =>{
    dispatch(logout());
    setLogoutModal(false)
    navigate("/signin");
    toast.warning("Logout!")
 }

  return (
    <Container>
  
        <Wrapper>
        <h2 style={{marginRight: '10px'}}>Are you sure?</h2>
          <Close  onClick={()=>{setLogoutModal(false)}}>x</Close>
          <Button onClick={handleLogout}>Logout</Button>
        </Wrapper>
    </Container>
  )
}
