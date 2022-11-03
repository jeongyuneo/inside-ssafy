import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BusInfo from './components/pages/BusInfo';
import Join from './components/pages/Join';
import Login from './components/pages/Login';

function App() {
  const queryClient = new QueryClient();
  axios.defaults.baseURL = 'https://www.inside-ssafy.com/';
  return <Join></Join>;
}

export default App;
