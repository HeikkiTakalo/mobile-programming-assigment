import { addDoc, collection, onSnapshot, query, } from "firebase/firestore";
import {useEffect, useState} from "react";
import { db, LOCATIONS_REF } from "../firebase/Config"


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

export function addLocation(name, description, rating) {
    return addDoc(collection(db, LOCATIONS_REF), {
        name,
        description,
        rating,
    }).catch(error => console.log(error.message));
}