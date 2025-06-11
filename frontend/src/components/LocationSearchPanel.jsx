import React from 'react'

export default function LocationSearchPanel(props) {

    console.log(props);

    // Sample array for locations
    const locations = [
        "Chroma, Piplani, Bhopal",
        "24B, Near Kapoor's Cafe, Sheryians Coding School, Bhopal",
        "Queen Mary School, Ayodhya Bypass, Bhopal",
        "Minal Gate 3, Ayodhya Bypass, Bhopal"
    ]

    return (
        <>
            <div>
                {/* This is just a sample data */}

                {
                    locations.map(function (elem, idx) {
                        return <div key={idx}
                        
                        onClick={() => {
                            props.setVehiclePanel(true)
                            props.setPanelOpen(false)
                        }}

                            className='flex items-center justify-start gap-4 border border-gray-100 active:border-black !p-2 rounded-xl !my-2'>
                            <div className='bg-[#eee] flex items-center justify-center h-10 aspect-square rounded-full flex-shrink-0'>
                                <i className="ri-map-pin-fill"></i>
                            </div>
                            <h4 className='font-medium'>
                                {elem}
                            </h4>
                        </div>
                    })
                }

            </div>
        </>
    )
}

