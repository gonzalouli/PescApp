import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToast } from '@ionic/react'
import React, { Component, useEffect, useState } from 'react'
import RefreshComponent from '../components/RefreshComponent'
import BackButton from '../components/BackButton'
import 'leaflet-css/dist/leaflet.css';
import environment from '../ENVIRONMENT';
import { Geolocation } from '@capacitor/geolocation';
import { TileLayer, Tooltip, Marker, MapContainer, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import '../theme/NewActivityLocalization.css';
import {MarkerComponent} from '../components/MarkerComponent';
import MapComponent from '../components/MapComponent';

/* initialize() is important for iOS,
  Android doesn't need any initialization.
*/


interface LocationError{
      showError: boolean;
      message?: string
}

interface Coordinates{
    lat: number,
    lng: number
}

function NewActivityLocalization() {
    const [ coords, setCoords] = useState<Coordinates>()
 
    const [zoom, setZoom] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<LocationError>({showError: false})

    const handleClick =(e)=>{
        setCoords({lat:e.lat,lng:e.lng})
    }
    
    // const currentPosition = async() => {
    //     setLoading(true)
        
    //     try{
    //         const position= await Geolocation.getCurrentPosition();
    //         console.log(position)
    //         pos.push(position.coords.latitude)
    //         pos.push(position.coords.longitude)
    //         // setCoords({lat:position.coords.latitude, lng:position.coords.longitude})

    //         // coord=[latitude,longitude]

    //         setLoading(false)
    //         setError({showError: false, message: undefined,})
    //     } catch (error) {
    //         const message = error.message.length >0 ? error.message: "No se pudo localizar..."
    //         setError({showError: true, message})
    //         setLoading(false)

    //     }
    // };
    
    // useEffect(()=>{
    //     currentPosition()

    // },[])

    return (
            <IonPage>
            <IonHeader className="header">
                <BackButton refer="/my/newActivity" />
                <IonTitle className='tittle' >Localización</IonTitle>
                </IonHeader>
                <IonContent>
                    <RefreshComponent/>
                    <IonLoading isOpen={loading} message={"Tomando posición"} onDidDismiss={()=>{setLoading(false)}}/>
                    <IonToast isOpen={error.showError} message={error.message} duration={3000} onDidDismiss={()=>{setError({message: undefined, showError: false})}} />
                    {/* <div className="Map">
                        <MapContainer className='Map-container'
                            center={[21,21]}
                            zoom={20}
                            scrollWheelZoom={true}>
                            <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>
                    </div> */}
                    <MapComponent></MapComponent>
                </IonContent>
            </IonPage>
        )
}


export default NewActivityLocalization;