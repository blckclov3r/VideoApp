import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Video from './components/Video';
import Signin from './components/Signin';
import { darkTheme,lightTheme } from './utils/Theme';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Main = styled.div`
  flex: 6;
  background: ${({theme})=>theme.bgLighter};
  color: ${({theme})=>theme.text};
`

const Wrapper = styled.div`
padding: 22px 2rem;
`

function App() {
  const [darkMode, setDarkMode] = useState(false);
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
                  <Route index element={<Home />} />
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
    </ThemeProvider>
  );
}

export default App;
