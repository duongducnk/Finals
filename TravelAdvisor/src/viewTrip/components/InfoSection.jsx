import { Button } from '@/components/ui/button';
import { GetPlaceDetails, GetPlacePhoto } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


function InfoSection({trip}) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        trip && fetchPlaceDetails();
    },[trip])
    const fetchPlaceDetails = async() => {
        const data = trip?.userSelection?.location

        try {
            const response = await GetPlaceDetails(data);
            
            // console.log(response.data); // Dữ liệu địa điểm từ Foursquare
            // console.log("Thông tin địa điểm:", response.data.results);

            // response.data.results.forEach((place) => {
            //     console.log("Tên địa điểm:", place.name);
            //     console.log("ID:", place.fsq_id);
            //     if (place.photos && place.photos.length > 0) {
            //         console.log("Ảnh:", place.photos[0].prefix + "original" + place.photos[0].suffix);
            //     } else {
            //         console.log("Không có ảnh");
            //     }
            // });

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
    <div>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='h-[340px] w-full object-cover rounded-xl' />
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'> {trip?.userSelection?.location} </h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 '>📅 {trip?.userSelection?.travelDays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-md'>💵 {trip?.userSelection?.budget} budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-md'>👨‍👩‍👦 Number of traveler: {trip?.userSelection?.people}</h2>
                </div>
            </div>
            <Button>
                <IoIosSend />
            </Button>
        </div>
    </div>
  )
}

export default InfoSection