import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start.jsx';
import UserSignup from './pages/UserSignup.jsx';
import UserLogin from './pages/UserLogin.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';
import Home from './pages/Home.jsx';
import UserProtectWrapper from './pages/UserProtectWrapper.jsx';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx';
import UserLogout from './pages/UserLogout.jsx';
import CaptainHome from './pages/CaptainHome.jsx';
import Riding from './pages/Riding.jsx';

export default function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/riding' element={ <Riding/> } />

        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />

        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />

        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />

      </Routes>
    </>
  )
}


