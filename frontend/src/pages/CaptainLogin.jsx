import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CaptainLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password
    });

    setEmail('');
    setPassword('');
  }

  return (
    <div className='!p-7 h-screen flex flex-col justify-between '>

      <div className=''>

        <img className='w-16 !mb-5' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

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
          Join a fleet
          <Link to='/captain-signup' className="text-blue-600 !ml-2">
            Register as a Captain
          </Link>
        </p>

      </div>

      <div>
        <Link to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold !mb-5 !mt-4 rounded !px-4 !py-2 w-full cursor-pointer'>
          Sign in as User
        </Link>
      </div>

    </div>
  )
}
