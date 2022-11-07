import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuCards from './components/organisms/MenuCards';
import { menus } from './components/organisms/MenuCards/testdata';
import BusInfo from './components/pages/BusInfo';
import Login from './components/pages/Login';
import MyPage from './components/pages/MyPage';

function App() {
  const queryClient = new QueryClient();
  axios.defaults.baseURL = 'https://www.inside-ssafy.com/';
  return (
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/businfo" element={<BusInfo />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter> */}
      <MenuCards items={menus}></MenuCards>
    </QueryClientProvider>
  );
}

export default App;
