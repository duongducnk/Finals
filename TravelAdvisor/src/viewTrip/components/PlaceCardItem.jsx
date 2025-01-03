import { Button } from '@/components/ui/button';
import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function PlaceCardItem({activities}) {
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activities.placeName || '')}, ${encodeURIComponent(activities.geoCoordinates.latitude || '')}, ${encodeURIComponent(activities.geoCoordinates.longitude || '')}`} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md transition-all cursor-pointer'>
          <img src='/placeholder.jpg' className='w-[130px] h-[130px] rounded-xl' />
          <div>
            <h2 className='font-bold text-lg'>{activities.placeName}</h2>
            <p className='text-sm text-gray-400'>{activities.placeDetails}</p>
            <h2 className='mt-2'>🕛 About {activities.timeToExplore}</h2>
            {/* <Button size='sm'>
              <FaMapLocationDot />
            </Button> */}
          </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem