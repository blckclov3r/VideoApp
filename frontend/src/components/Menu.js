import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import React from "react";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import styled from "styled-components";
import videAppImg from "../img/yt.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  toast } from 'react-toastify';

const Container = styled.div`
  flex: 1;
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  height: 100%;
  
`;
const Wrapper = styled.div`
    padding: 1.1rem .4rem;
    font-size: 14px;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 1.5rem;
  padding: 0 1rem
`
const Img = styled.img`
  height: 26px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
padding: 0 .8rem;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: .7rem;
  padding: 0px 1rem;
`;



export default function Menu({ darkMode, setDarkMode }) {

  const user = useSelector(state=>state.user.currentUser);

  const handleItemClick = (itemName) =>{
    toast(`Sorry, this ${itemName} is not available`)
  }

  return (
    <Container>
      <Wrapper>

        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo>
            <Img src={videAppImg} alt="logo" />
            <h2>VideoApp</h2>
          </Logo>
        </Link>

        <Link to="/" style={{ textDecoration: "none",color: 'inherit' }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>

        <Link to="/trends" style={{ textDecoration: "none",color: 'inherit' }}>
        <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
        </Link>

        <Link to="/subscriptions" style={{ textDecoration: "none",color: 'inherit' }}>
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        </Link>

        <Hr />
        <Item onClick={()=>{handleItemClick("Library")}}>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item onClick={()=>{handleItemClick("History")}}>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {
          user ? '' : (
            <>
              <Login>
          Sign in to like videos, comment, and subscribe.
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        </Login>
        <Hr />
            </>
          )
        }
        
        <Title>BEST OF VIDEOAPP</Title>
        <Item onClick={()=>{handleItemClick("Music")}}>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item onClick={()=>{handleItemClick("Sports")}}>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item onClick={()=>{handleItemClick("Gaming")}}>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item onClick={()=>{handleItemClick("Movies")}}>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item onClick={()=>{handleItemClick("News")}}>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item onClick={()=>{handleItemClick("Live")}}>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item onClick={()=>{handleItemClick("Settings")}}>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item onClick={()=>{handleItemClick("Report")}}>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item onClick={()=>{handleItemClick("Help")}}>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>

      </Wrapper>
    </Container>
  )
}
