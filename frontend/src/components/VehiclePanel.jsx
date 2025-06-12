import React from 'react'

export default function VehiclePanel(props) {
    return (
        <div>
            <h5 onClick={() => { props.setVehiclePanel(false) }} className='!p-3 text-xl cursor-pointer text-center w-[93%] absolute top-[-2%]'><i className="ri-arrow-down-wide-line text-xl"></i></h5>
            <h3 className='text-[22px] font-semibold !mt-2 !mb-3'>Choose a vehicle</h3>

            <div onClick={() => {props.setConfirmRidePanel(true)}} className='flex items-center justify-between w-full !p-3 border-2 active:border-black rounded-xl !mb-3'>
                <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />

                <div className=' w-1/2'>
                    <h4 className='font-medium text-md'>UberGo <span><i className="ri-user-3-fill"></i></span>4</h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                </div>

                <h2 className='text-xl font-semibold'>₹193.2</h2>
            </div>

            <div onClick={() => {props.setConfirmRidePanel(true)}} className='flex items-center justify-between w-full !p-3 border-2 border-black rounded-xl !mb-3'>
                <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />

                <div className=' w-1/2'>
                    <h4 className='font-medium text-md'>UberMoto <span><i className="ri-user-3-fill"></i></span>1</h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable motorcycle rides</p>
                </div>

                <h2 className='text-xl font-semibold'>₹65</h2>
            </div>

            <div onClick={() => {props.setConfirmRidePanel(true)}} className='flex items-center justify-between w-full !p-3 border-2 border-black rounded-xl !mb-3'>
                <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />

                <div className=' w-1/2'>
                    <h4 className='font-medium text-md'>UberAuto <span><i className="ri-user-3-fill"></i></span>3</h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable auto rides</p>
                </div>

                <h2 className='text-xl font-semibold'>₹118.68</h2>
            </div>
        </div>
    )
}