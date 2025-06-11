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
  const vehiclePanelRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);

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

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel]);

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
              onClick={() => { setPanelOpen(!panelOpen) }}
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
                onChange={(e) => { setPickup(e.target.value) }}
                onClick={() => { setPanelOpen(true) }}
              />

              <input
                className='bg-[#eee] !px-10 !py-2 text-base rounded-lg w-full !mb-3 !mt-3'
                type="text"
                placeholder='Enter destination'
                value={destination}
                onChange={(e) => { setDestination(e.target.value) }}
                onClick={() => { setPanelOpen(true) }}
              />

            </form>
          </div>

          <div
            ref={panelRef}
            className={`${panelOpen ? ' !p-5' : 'bg-transparent !p-0'} overflow-hidden transition-all duration-300`}
            style={{ height: '0px' }}
          >
            {/* Panel content can go here */}
            <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
          </div>
        </div>


        <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 bg-white !py-4 !px-3 w-full translate-y-full'>

          <h5 onClick={() => {setVehiclePanel(false)}} className='!p-3 text-xl cursor-pointer text-center w-[93%] absolute top-[-2%]'><i className="ri-arrow-down-wide-line text-xl"></i></h5>
          <h3 className='text-[22px] font-semibold !mt-2 !mb-3'>Choose a vehicle</h3>

          <div className='flex items-center justify-between w-full !p-3 border-2 active:border-black rounded-xl !mb-3'>
            <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />

            <div className=' w-1/2'>
              <h4 className='font-medium text-md'>UberGo <span><i className="ri-user-3-fill"></i></span>4</h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
            </div>

            <h2 className='text-xl font-semibold'>₹193.2</h2>
          </div>

          <div className='flex items-center justify-between w-full !p-3 border-2 border-black rounded-xl !mb-3'>
            <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />

            <div className=' w-1/2'>
              <h4 className='font-medium text-md'>UberMoto <span><i className="ri-user-3-fill"></i></span>1</h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-medium text-xs text-gray-600'>Affordable motorcycle rides</p>
            </div>

            <h2 className='text-xl font-semibold'>₹65</h2>
          </div>

          <div className='flex items-center justify-between w-full !p-3 border-2 border-black rounded-xl !mb-3'>
            <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />

            <div className=' w-1/2'>
              <h4 className='font-medium text-md'>UberAuto <span><i className="ri-user-3-fill"></i></span>3</h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-medium text-xs text-gray-600'>Affordable auto rides</p>
            </div>

            <h2 className='text-xl font-semibold'>₹118.68</h2>
          </div>

        </div>
      </div>
    </>
  )
}

