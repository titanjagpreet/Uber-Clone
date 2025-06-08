import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function CaptainSignup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const CaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, CaptainData);

      if (response.status === 201) {
        const data = response.data.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }

    } catch (err) {
      if (axios.isAxiosError(error)) {
        console.error('Signup error:', error.response?.data); // 🔍 See backend response
      } else {
        console.error('Unexpected error:', error);
      }
    }

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }

  return (
    <div className='!px-7 !py-4 h-screen flex flex-col justify-between '>

      <div className=''>

        <img className='w-16 !mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form action="" onSubmit={(e) => { submitHandler(e) }}>

          <h3 className='text-lg font-medium !mb-2'>
            What's our Captain's name
          </h3>
          <div className='flex gap-3 !mb-3'>
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
            What's our Captain's email?
          </h3>

          <input required

            type="email" placeholder='email@example.com' className='bg-[#EEEEEE] !mb-3 rounded !px-4 !py-2 border-0 w-full text-lg placeholder:text-base'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />

          <h3 className='text-lg font-medium !mb-2'>
            Enter Password
          </h3>

          <input required
            type="password"

            placeholder='password' className='bg-[#EEEEEE] !mb-3 rounded !px-4 !py-2 border-0 w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />

          <h3 className='text-lg font-medium !mb-2'>Vehicle Information</h3>
          <div className='flex gap-3 !mb-3'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg !px-4 !py-2 text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg !px-4 !py-2 text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-3 !mb-3'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg !px-4 !py-2 text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-sm !px-2 !py-2 text-[14px]  placeholder:text-[14px] '
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled >Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button className='bg-[#111] text-white font-semibold !mb-3 rounded !px-4 !py-2 w-full cursor-pointer'>
            Signup
          </button>

        </form>

        <p className="text-center">
          Already have an account?
          <Link to='/captain-login' className="text-blue-600 !ml-2">
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

