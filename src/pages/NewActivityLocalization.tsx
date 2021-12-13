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

// prueba de googlemaps
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';



interface LocationError{
      showError: boolean;
      message?: string
}

interface Coordinates{
    lat: number,
    lng: number,
    time: string;
}



function NewActivityLocalization() {
  
    
    return (
            <IonPage>
            <IonHeader className="header">
                <BackButton refer="/my/newActivity" />
                <IonTitle className='tittle' >Localización</IonTitle>
                </IonHeader>
                <IonContent>
                    <RefreshComponent/>
                    <MapComponent></MapComponent>
                   
                </IonContent>
            </IonPage>
        )
}


export default NewActivityLocalization;