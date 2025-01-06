import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5";
import { GetPlaceDetails, GetPlacePhoto } from '@/service/GlobalApi';

function HotelCardItem({hotel}) {

    const [photoUrl, setPhotoUrl] = useState();
        useEffect(() => {
            hotel && fetchPlaceDetails();
        },[hotel])
        const fetchPlaceDetails = async() => {
            const data = hotel.hotelName
    
            try {
                const response = await GetPlaceDetails(data);
                
                // console.log(response.data); // Dữ liệu địa điểm từ Foursquare
                // console.log("Thông tin địa điểm:", response.data.results);
                response.data.results.forEach(async (place) => {
                                if (place.fsq_id) {
                                  const photosResponse = await GetPlacePhoto(place.fsq_id);
                                  const photos = photosResponse.data;
                        
                                  if (photos.length > 0) {
                                    const photoUrl = `${photos[0].prefix}original${photos[0].suffix}`;
                                    setPhotoUrl(photoUrl);
                                  } else {
                                    console.log("Địa điểm không có ảnh:", place.name);
                                  }
                                }
                              });
            
                        } catch (error) {
                            console.error("Lỗi khi gọi API Foursquare:", error);
                            console.error("Lỗi chi tiết:", error.response?.data || error.message);
                        }
                    }
                

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName || '')}, ${encodeURIComponent(hotel.hotelAddress || '')}`} target='_blank'>
                        <div>
                            <div className='hover:scale-105 transition-all cursor-pointer'>
                                <img src= {photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
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
  )
}

export default HotelCardItem