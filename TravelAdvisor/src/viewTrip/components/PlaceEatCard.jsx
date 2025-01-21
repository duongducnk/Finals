import { Button } from '@/components/ui/button';
import { GetPlaceDetails, GetPlacePhoto } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';


function PlaceEatCard({placeToEat}) {
 const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        placeToEat && fetchPlaceDetails();
    },[placeToEat])
    const fetchPlaceDetails = async() => {
        const data = placeToEat.placeName

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
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeToEat.placeName || '')}, ${encodeURIComponent(placeToEat.geoCoordinates.latitude || '')}, ${encodeURIComponent(placeToEat.geoCoordinates.longitude || '')}`} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md transition-all cursor-pointer'>
          <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='w-[130px] h-[130px] rounded-xl object-cover' />
          <div>
            <h2 className='font-bold text-lg'>{placeToEat.placeName}</h2>
            <h2 className='text-xs text-gray-500 flex items-center'>
                <IoLocationOutline />
                {placeToEat.placeAddress}
            </h2>
            <h2 className='text-sm mt-5'>💵 {placeToEat.price}</h2>
            {/* <Button size='sm'>
              <FaMapLocationDot />
            </Button> */}
          </div>
      </div>
    </Link>
  )
}

export default PlaceEatCard