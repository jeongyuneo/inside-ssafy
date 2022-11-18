import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BusInfo from './components/pages/BusInfo';
import Join from './components/pages/Join';
import Login from './components/pages/Login';
import MyPage from './components/pages/MyPage';
import Main from './components/pages/Main';
import Spinner from './utils/Spinner';
import { ErrorBoundary } from './utils/ErrorBoundary';
import Menu from './components/pages/Menu';
import MyInfoEdit from './components/pages/MyInfoEdit';
import interceptResponse from './utils/interceptResponse';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import Board from './components/pages/Board';
import PostDetail from './components/pages/PostDetail';
import CreatePost from './components/pages/CreatePost';
import PostSearch from './components/pages/PostSearch';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  axios.defaults.baseURL = 'https://www.inside-ssafy.com/';
  interceptResponse();

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <Main />
                  </PrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/join"
                element={
                  <PublicRoute>
                    <Join />
                  </PublicRoute>
                }
              />
              <Route
                path="/businfo"
                element={
                  <PrivateRoute>
                    <BusInfo />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage"
                element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/menu"
                element={
                  <PrivateRoute>
                    <Menu />
                  </PrivateRoute>
                }
              />
              <Route
                path="/myinfoedit"
                element={
                  <PrivateRoute>
                    <MyInfoEdit />
                  </PrivateRoute>
                }
              />
              <Route
                path="/board"
                element={
                  <PrivateRoute>
                    <Board />
                  </PrivateRoute>
                }
              />
              <Route
                path="/postdetail"
                element={
                  <PrivateRoute>
                    <PostDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/createpost"
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/postsearch"
                element={
                  <PrivateRoute>
                    <PostSearch />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
