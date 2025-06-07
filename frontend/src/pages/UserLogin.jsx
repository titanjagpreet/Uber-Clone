import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios'

export default function UserLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

      if (response.status === 200) {
        const data = response.data.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }

    } catch (error) {

      if (axios.isAxiosError(error)) {
        console.error('Signup error:', error.response?.data); // 🔍 See backend response
      } else {
        console.error('Unexpected error:', error);
      }
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className='!p-7 h-screen flex flex-col justify-between '>

      <div className=''>

        <img className='w-16 !mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form action="" onSubmit={(e) => { submitHandler(e) }}>

          <h3 className='text-lg font-medium !mb-2'>
            What's your email?
          </h3>

          <input required
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="email" placeholder='email@example.com' className='bg-[#EEEEEE] !mb-7 rounded !px-4 !py-2 border-0 w-full text-lg placeholder:text-base' />

          <h3 className='text-lg font-medium !mb-2'>
            Enter Password
          </h3>

          <input required
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            placeholder='password' className='bg-[#EEEEEE] !mb-7 rounded !px-4 !py-2 border-0 w-full text-lg placeholder:text-base' />

          <button className='bg-[#111] text-white font-semibold !mb-3 rounded !px-4 !py-2 w-full cursor-pointer'>
            Login
          </button>

        </form>

        <p className="text-center">
          New here?
          <Link to='/signup' className="text-blue-600 !ml-2">
            Create New Account
          </Link>
        </p>

      </div>

      <div>
        <Link to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold !mb-5 !mt-4 rounded !px-4 !py-2 w-full cursor-pointer'>
          Sign in as Captain
        </Link>
      </div>

    </div>
  )
}