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

const Container = styled.div`
  display: flex;
  flex-direction: row;
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
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub"  />} />
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
        position="bottom-right"
        closeOnClick
        newestOnTop={true}
      />

    </ThemeProvider>
  );
}

export default App;
