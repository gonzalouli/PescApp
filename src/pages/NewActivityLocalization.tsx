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

/* initialize() is important for iOS,
  Android doesn't need any initialization.
*/

const CustomMarker = props => {
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    }
    return <Marker ref={initMarker} {...props}/>
  }

  interface LocationError{
      showError: boolean;
      message?: string
  }

function NewActivityLocalization() {
    const [ currentLocation, setCurrentLocation ] = useState({lat: 0, lon: 0})
    const [zoom, setZoom] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<LocationError>({showError: false})

    useEffect(()=>{
        currentPosition()
    },[])

    const handleClick =(e)=>{
        this.setState({ currentLocation: e.latlng });
    }
    
    const currentPosition = async() => {
        setLoading(true)
        try {        
            const position= await Geolocation.getCurrentPosition();
            console.log(position)
            setCurrentLocation({lat:position.coords.latitude, lon: position.coords.longitude})
            console.log(currentLocation)
            setLoading(false)
            setError({showError: false, message: undefined,})
        } catch (error) {
            const message = error.message.length >0 ? error.message: "No se pudo localizar..."
            setError({showError: true, message})
            setLoading(false)

        }
    };
    

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
                    
                    <MapContainer
                        center={[currentLocation.lat,currentLocation.lon]}
                        zoom={7}
                        scrollWheelZoom={true}>
                        <TileLayer  attribution='&copy; 
                        <a href=»http://osm.org/copyright»>OpenStreetMap</a> 
                        contributors'  url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}  />
                    </MapContainer>


                </IonContent>
            </IonPage>
        )
}


export default NewActivityLocalization;