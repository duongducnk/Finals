import axios from "axios"

const BASE_URL='https://api.foursquare.com/v3/places'

const config = {

    headers: {
        'Content-Type': 'application/json',
        'Authorization': import.meta.env.VITE_FOURSQUARE_API_KEY, 
    } 
};

export const GetPlaceDetails = (data) => {
    const params = {
        query: data, 
        fields: "name,fsq_id,photos,categories",            
        limit: 3,                    
        categories: "16000", 
    };
    return axios.get(`${BASE_URL}/search`, { params, ...config });
};

export const GetPlacePhoto = (fsq_id) => {
    return axios.get(`${BASE_URL}/${fsq_id}/photos`, config);
  };

