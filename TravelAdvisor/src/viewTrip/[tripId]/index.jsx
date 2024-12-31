import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

function ViewTrip() {
    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(()=> {
        tripId&&GetTripData();
    }, [tripId])

    //Get trip info from firebase
    const GetTripData = async() => {
        const docRef = doc(db, 'TravelAdvisor', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document: ", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No such document");
            toast('No trip found!');
        }
    }

  return (
    <div>ViewTrip: {tripId}</div>
  )
}

export default ViewTrip