import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import styled from "styled-components";
import {  useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Upload } from "./Upload";
import { useState } from "react";
import Logout from "./Logout";

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 56px;
  box-shadow: 0 .125rem .0rem rgba(0,0,0,.075) !important;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
  background-color: ${({ theme }) => theme.bg};
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weigth: 500;
  color: ${({theme})=>theme.text}
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`



export default function Navbar() {

  const [open,setOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const [inputQuery,setInputQuery] = useState("");
  const navigate = useNavigate();
  

  const user = useSelector(state=> state.user.currentUser);
  // console.log('currentUser',user)

  const handleVideoCall = () =>{
    setOpen(true)
  }

  return (
    <>
      <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search' value={inputQuery} onChange={(e)=>setInputQuery(e.target.value)} />
          <SearchOutlinedIcon type="submit" onClick={()=>{navigate(`/search?q=${inputQuery}`)}} />
        </Search>
       {
        user ? (
          // <User onClick={()=>dispatch(logout())}>
          <User >
             <VideoCallOutlinedIcon  onClick={handleVideoCall} />
             <Avatar src={user.img ? user.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-SJEWBFE4t685cgNnpxFumHYvUWk_Z71-A&usqp=CAU"} onClick={()=>setLogoutModal(true)}  />
             {user.name}
          </User>

        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
          <Button >
            <AccountCircleOutlinedIcon />
            {user ? 'SIGN OUT' : 'SIGN IN'}
          </Button>
        </Link>
        )
       }
      </Wrapper>
    </Container>

    {
      open && <Upload setOpen={setOpen} />
    }

    {
      (logoutModal === true && open === false) && <Logout setLogoutModal={setLogoutModal} />
    }
    </>
  )
}
