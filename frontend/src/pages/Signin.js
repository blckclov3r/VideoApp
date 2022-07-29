import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../features/userSlice";
import { auth, provider } from "../firebase";

import {  toast } from 'react-toastify';




import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
  width: 500px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  justify-content: space-between;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Link = styled.span`
  margin-left: 60px;
  display: block;
`;

const SignIn = () => {

  const {currentUser} = useSelector(state=>state.user);
  const navigate = useNavigate();
  
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignin = async()=>{
    dispatch(loginStart())
    try {
      const res = await axiosInstance.post("/auth/signin",{
        name,password
      });
      // console.log(res?.data);
      dispatch(loginSuccess(res?.data));
      toast.success("Successfully Logging in!");
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
      toast.error("Something went wrong, please check your username or password");
    }
  }

  const signInWithGoogle =   () =>{
    dispatch(loginStart());
     signInWithPopup(auth,provider).then((result)=>{

      axiosInstance.post("/auth/google",{
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL
      }).then(res=>{
        dispatch(loginSuccess(res?.data));
      })
      navigate("/");
    }).catch((err)=>{
      console.log(err);
      dispatch(loginFailure());
      toast.info("Something went wrong!");
    })
  }

  const handleSignup = async() => {
    dispatch(loginStart())
    await axiosInstance.post("/auth/signup",{
      name,password,email
    }).then(res=>{
      if(res.status === 201){
        dispatch(loginSuccess(res?.data));
        toast.success("Successfully registed!");
      }
    }).catch((err)=>{
      console.log(err);
      dispatch(loginFailure());
    })
  }




  useEffect(() => {
    if(currentUser !== null){
      // navigate("/");
    }
  }, [currentUser,navigate]);

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to VideoApp</SubTitle>
        <Input placeholder="username" value={name} onChange={(e)=>setName(e.target.value)} />
        <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
        <Button onClick={handleSignin}>Sign in</Button>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input placeholder="username" value={name} onChange={(e)=>setName(e.target.value)}  />
        <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;