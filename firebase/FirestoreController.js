import { addDoc, collection, onSnapshot, query, } from "firebase/firestore";
import {useEffect, useState} from "react";
import { db, LOCATIONS_REF } from "../firebase/Config"
import * as Location from 'expo-location';


export function useFireLocations(){
    const [locations, setLocations] = useState([])

    useEffect(()=>{


        const q = query(collection(db, LOCATIONS_REF));

        onSnapshot(q, querySnaphot => {
            setLocations( querySnaphot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }));
        });


    }, []);


    return locations;
}

export async function addLocation(name, description, rating) {
    try {
    
        const geoResults = await Location.geocodeAsync(name);
        
        if (!geoResults.length) {
            throw new Error('Location coordinates not found');
        }

        const { latitude, longitude } = geoResults[0];

        
        await addDoc(collection(db, LOCATIONS_REF), {
            name,
            description,
            rating,
            location: { latitude, longitude }
        });

        console.log("Location added successfully");
    } catch (error) {
        console.log("Error adding location:", error.message);
    }
}