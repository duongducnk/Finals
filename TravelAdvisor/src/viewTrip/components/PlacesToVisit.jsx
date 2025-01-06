import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to visit</h2>

        <div>
            {trip?.tripData?.travelPlan.itinerary?.map((item, itineraryIndex) => (
                <div key={itineraryIndex} className='mt-5'>
                    <h2 className='font-medium text-lg'>Day {item.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {item.placeToVisit?.map((placeToVisit, placeToVisitIndex) => (
                                <div key={placeToVisitIndex}>
                                    <div className='my-3'>
                                        <h2 className='font-medium text-sm text-orange-600'>{placeToVisit.bestTimeToVisit}</h2>
                                        <PlaceCardItem placeToVisit={placeToVisit}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit