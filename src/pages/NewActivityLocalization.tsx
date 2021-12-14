import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonTextarea, IonTitle, IonToast } from '@ionic/react'
import React, { Component, useEffect, useState } from 'react'
import RefreshComponent from '../components/RefreshComponent'
import BackButton from '../components/BackButton'
import 'leaflet-css/dist/leaflet.css';
import { Geolocation } from '@capacitor/geolocation';

import 'leaflet/dist/leaflet.css';
import '../theme/NewActivityLocalization.css';
 import MapComponent from '../components/MapComponent';

/* initialize() is important for iOS,
  Android doesn't need any initialization.
*/

// prueba de googlemaps
interface LocationError{
    showError: boolean;
    message?: string
}
interface Coordinates{
    lat: number,
    lng: number,
    date: string;
    }

function NewActivityLocalization() {

   
    const handleTextChange = e  =>{
        const activityMod = JSON.parse(window.sessionStorage.getItem("newActivity"))
        activityMod.localization.text = e.target.value
        window.sessionStorage.setItem("newActivity",JSON.stringify(activityMod))
    }


    
    return (
            <IonPage>
            <IonHeader className="header">
                <BackButton refer="/my/newActivity" />
                <IonTitle className='tittle' >Localización</IonTitle>
            </IonHeader>
                <IonContent>
                    <MapComponent  />
                    <IonList className="form-container">
                        <IonItem className="description">
                            <IonLabel className="label" position="floating">Descripción</IonLabel>
                            <IonTextarea value={JSON.parse(window.sessionStorage.getItem("newActivity")).localization.text} onIonChange={handleTextChange}></IonTextarea>
                        </IonItem>
                        <IonButton className="button-acept">Aceptar</IonButton>
                    </IonList>
                </IonContent>
            </IonPage>
        )
}


export default NewActivityLocalization;