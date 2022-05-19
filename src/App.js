import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './assets/css/App.css';
import NavBar from './components/NavBar';

const Home = React.lazy(() => import('./Pages/Home/Home'));
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Signup = React.lazy(() => import('./Pages/Signup/Signup'));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<>Loading...</>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<>Loading...</>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<>Loading...</>}>
              <Signup />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
