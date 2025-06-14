import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'

export default function CaptainHome() {

  return (
    <div className='h-screen'>
      <div className='fixed !p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-login' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://www.cnet.com/a/img/resize/6583ce8f8bb39d0f21acc33e4f616358be7616df/hub/2013/07/10/efafd552-f07a-11e2-8c7c-d4ae52e62bcc/maps_wide.png?auto=webp&width=1200" alt="" />

      </div>
      <div className='h-2/5 !p-6'>
        <CaptainDetails />
      </div>

    </div>
  )
}

