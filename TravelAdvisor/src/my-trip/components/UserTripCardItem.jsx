import { GetPlaceDetails, GetPlacePhoto } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {

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
    <Link to={'/view-trip/'+trip?.id}>
      <div className='hover:scale-105 transition-all'>
        <img src={photoUrl?photoUrl:"/placeholder.jpg"} className="object-cover rounded-xl h-[220px]" />
        <div>
          <h2 className='font-bold text-lg'> {trip?.userSelection?.location} </h2>
          <h2 className='text-sm text-gray-500'>{trip?.userSelection?.travelDays} days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCardItem