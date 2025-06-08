import React from 'react'
import {Link} from 'react-router-dom'

export default function Start() {

  return (
    <div>

      <div className='bg-cover bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen flex flex-col justify-between w-full !pt-8'>

        <img className='w-16 !ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <div className='bg-white !py-4 !px-4 !pb-6 w-full'>
          <h2 className='text-2xl font-bold text-center'>
            Get Started with Uber
          </h2>

          <Link className='flex items-center justify-center w-full bg-black text-white text-[17px] !py-3 rounded !mt-5'
            to='/login' >
            Continue
          </Link>

        </div>
      </div>
    </div>
  )
}

