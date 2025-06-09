import React from 'react'

export default function Home() {

  return (
    <>
      <div className="relative">
        {/* <img
          className="w-16 absolute left-5 top-5 z-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        /> */}

        <div className="h-screen w-screen">
          {/* background image */}
          <img
            className="h-full w-full object-cover scale-100 z-0"
            src="https://www.cnet.com/a/img/resize/6583ce8f8bb39d0f21acc33e4f616358be7616df/hub/2013/07/10/efafd552-f07a-11e2-8c7c-d4ae52e62bcc/maps_wide.png?auto=webp&width=1200"
            alt=""
          />
        </div>

        <div className='bg-white absolute bottom-0 w-full flex flex-col z-10 transition-all duration-300 ease-in-out h-auto'>

          <div className='!px-5 bg-white !py-4 flex-shrink-0'>

            <h4 className='text-2xl font-semibold'>
              Find a trip
            </h4>

            <form action="">

              <div className='line absolute h-15 w-[2px] top-[44%] left-10 bg-gray-800 rounded-full'>

              </div>

              <input className='bg-[#eee] !px-10 !py-2 text-base rounded-lg w-full !mt-4' type="text" placeholder='Add a pickup' />
              <input className='bg-[#eee] !px-10 !py-2 text-base rounded-lg w-full !mb-3 !mt-3' type="text" placeholder='Enter destination' />

            </form>
          </div>

          <div className='bg-red-500 !p-5 hidden h-[70vh]'>

          </div>
        </div>
      </div>
    </>
  )
}

