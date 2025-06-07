import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';

export default function UserSignup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);


  const submitHandler = async (e) => {

    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
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

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='!p-7 h-screen flex flex-col justify-between '>

      <div className=''>

        <img className='w-16 !mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form action="" onSubmit={(e) => { submitHandler(e) }}>

          <h3 className='text-lg font-medium !mb-2'>
            What's your name
          </h3>
          <div className='flex gap-3 !mb-5'>
            <input required

              type="text" placeholder='First name' className='bg-[#EEEEEE] rounded !px-4 !py-2 border-0 w-1/2 text-lg placeholder:text-base'
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value) }}
            />

            <input required

              type="text" placeholder='Last name' className='bg-[#EEEEEE] rounded !px-4 !py-2 border-0 w-1/2 text-lg placeholder:text-base'
              value={lastName}
              onChange={(e) => { setLastName(e.target.value) }}
            />
          </div>

          <h3 className='text-lg font-medium !mb-2'>
            What's your email?
          </h3>

          <input required

            type="email" placeholder='email@example.com' className='bg-[#EEEEEE] !mb-5 rounded !px-4 !py-2 border-0 w-full text-lg placeholder:text-base'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />

          <h3 className='text-lg font-medium !mb-2'>
            Enter Password
          </h3>

          <input required
            type="password"

            placeholder='password' className='bg-[#EEEEEE] !mb-5 rounded !px-4 !py-2 border-0 w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />

          <button className='bg-[#111] text-white font-semibold !mb-3 rounded !px-4 !py-2 w-full cursor-pointer'>
            Signup
          </button>

        </form>

        <p className="text-center">
          Already have an account?
          <Link to='/login' className="text-blue-600 !ml-2">
            Signin here
          </Link>
        </p>

      </div>

      <div>
        <p className='text-[11px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>

    </div>
  )
}

