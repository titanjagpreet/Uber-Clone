import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

export default function Home() {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const arrowRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '72.5vh',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(arrowRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0px',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(arrowRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [panelOpen]);

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

        <div className='bg-white absolute bottom-0 w-full flex flex-col z-10 h-auto'>

          <div className='!px-5 bg-white !py-4 flex-shrink-0 relative'>

            <h5 
              ref={arrowRef}
              className='absolute top-[10%] right-5 text-xl cursor-pointer'
              onClick={() => {setPanelOpen(!panelOpen)}}
              style={{ opacity: 0 }}
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>

            <h4 className='text-2xl font-semibold'>
              Find a trip
            </h4>

            <form onSubmit={submitHandler}>

              <div className='line absolute h-15 w-[2px] top-[44%] left-10 bg-gray-800 rounded-full'></div>

              <input 
                className='bg-[#eee] !px-10 !py-2 text-base rounded-lg w-full !mt-4' 
                type="text" 
                placeholder='Add a pickup'
                value={pickup}
                onChange={(e) => {setPickup(e.target.value)}} 
                onClick={() => {setPanelOpen(true)}} 
              />

              <input 
                className='bg-[#eee] !px-10 !py-2 text-base rounded-lg w-full !mb-3 !mt-3' 
                type="text" 
                placeholder='Enter destination' 
                value={destination}
                onChange={(e) => {setDestination(e.target.value)}}
                onClick={() => {setPanelOpen(true)}} 
              />

            </form>
          </div>

          <div 
            ref={panelRef} 
            className={`${panelOpen ? ' !p-5' : 'bg-transparent !p-0'} overflow-hidden transition-all duration-300`}
            style={{ height: '0px' }}
          >
            {/* Panel content can go here */}
            <LocationSearchPanel/>
          </div>
        </div>
      </div>
    </>
  )
}

