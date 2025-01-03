import React from 'react'

import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5 mb-2'>Hotel Recommendation</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.travelPlan.hotelOptions?.map((hotel, hotelIndex) => (
                <div key={hotelIndex}>
                    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName || '')}, ${encodeURIComponent(hotel.hotelAddress || '')}`} target='_blank'>
                        <div>
                            <div className='hover:scale-105 transition-all cursor-pointer'>
                                <img src='/placeholder.jpg' className='rounded-xl' />
                                <div className='my-2 flex flex-col gap-2'>
                                    <h2 className='font-medium'>{hotel.hotelName}</h2>
                                    <h2 className='text-xs text-gray-500 flex items-center'>
                                        <IoLocationOutline />
                                        {hotel.hotelAddress}
                                    </h2>
                                    <h2 className='text-sm'>💵 {hotel.hotelPrice}</h2>
                                    <h2 className='text-sm'>⭐ {hotel.rating}</h2>

                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}



        </div>

    </div>
  )
}

export default Hotels