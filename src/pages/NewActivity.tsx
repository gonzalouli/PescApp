import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle } from '@ionic/react'
import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import '../theme/Header.css'
import '../theme/NewActivity.css'

export default function NewActivity() {

    const [name, setName] = useState('')
    return (
        <IonPage>
        <IonHeader className="header">
                <BackButton refer="/my/home" />
                <IonTitle className='tittle' >Nueva Actividad</IonTitle>
        </IonHeader>
        <IonContent>
            <IonList className="container">
                <IonItem>
                    <IonLabel className="label"     position="stacked">Nombre</IonLabel>
                    <IonInput className="text" type='text' value={name} 
                        onIonChange={e=>setName(e.detail.value)}/>
                </IonItem>
                <IonButton className="main-button"  expand="block">Localización</IonButton>
                <IonButton className="main-button"  expand="block">Equipo</IonButton>
                <IonButton className="main-button"  expand="block">Captura</IonButton>
                <IonButton className="main-button"  expand="block">Fecha</IonButton>
            </IonList>
        </IonContent>
    </IonPage>  
    )
}
