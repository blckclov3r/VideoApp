import "./App.css";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Video from "./pages/Video";
import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Theme";
import Search from "./pages/Search";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { axiosInstance } from "./config";
import { useQuery } from "react-query";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const Main = styled.div`
  flex: 6;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({theme})=>theme.text};
`

const Wrapper = styled.div`
padding: 22px 2rem;
`





function App() {

  const [darkMode, setDarkMode] = useState(true);
  
  const type = useSelector(state=>state.video.type);

  const fetchVideos = async () => {
    return await axiosInstance.get(`/videos/${type}`)
      .then(res => {
        return res?.data;
      })
      .catch((err) => {
        console.log(err?.response?.data?.status);
      });
  }

  const { data, isLoading,status} = useQuery(['APP/FETCHVIDEOS', type], fetchVideos,{
    refetchOnWindowFocus: false,
    keepPreviousData: true
  });

  console.log(data)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>

              <Routes>
                <Route path="*" element={<NotFound />} />

                <Route path="/" element={<Layout />}>

                  <Route path="/" element={<Home type='random' data={data} isLoading={isLoading} status={status} />} />
                  <Route path="trends" element={<Home type="trend" data={data} isLoading={isLoading} status={status} />} />
                  <Route path="subscriptions" element={<Home type="sub" data={data} isLoading={isLoading} status={status}  />} />

                  <Route path="search" element={<Search   />} />
                  <Route path="signin" element={<Signin />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>

            </Wrapper>
          </Main>
        </Container>

      </BrowserRouter>
      
      <ToastContainer
        position="top-right"
        closeOnClick
        newestOnTop={true}
      />

    </ThemeProvider>
  );
}

export default App;
