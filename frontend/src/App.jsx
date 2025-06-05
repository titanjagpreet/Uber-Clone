import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx';
import UserSignup from './pages/UserSignup.jsx';
import UserLogin from './pages/UserLogin.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';

export default function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/signup' element={<UserSignup/>} />
      <Route path='/login' element={<UserLogin/>} />
      <Route path='/captain-signup' element={<CaptainSignup/>} />
      <Route path='/captain-login' element={<CaptainLogin/>} />
    </Routes>
    </>
  )
}


