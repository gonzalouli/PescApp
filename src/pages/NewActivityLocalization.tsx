import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle } from '@ionic/react'
import React from 'react'
import RefreshComponent from '../components/RefreshComponent'
import BackButton from '../components/BackButton'
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function NewActivityLocalization() {
    return (
        <IonPage>
        <IonHeader className="header">
            <BackButton refer="/my/newActivity" />
            <IonTitle className='tittle' >Localización</IonTitle>
            </IonHeader>
            <IonContent>
                <RefreshComponent/>


            </IonContent>
        </IonPage>
    )
}
