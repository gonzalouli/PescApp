import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle } from '@ionic/react'
import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import RefreshComponent from '../components/RefreshComponent'
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
            <RefreshComponent/>
            <IonList className="container">
                <IonItem className="name">
                    <IonLabel className="label" position="floating">Nombre</IonLabel>
                    <IonInput className="text" type='text' value={name} 
                        onIonChange={e=>setName(e.detail.value)}/>
                </IonItem>
                <IonButton className="main-button"  expand="block" href="/my/NewActivity/Localization">Localización</IonButton>
                <IonButton className="main-button"  expand="block" href="/my/NewActivity/Tackle">Equipo</IonButton>
                <IonButton className="main-button"  expand="block">Captura</IonButton>
                <IonButton className="main-button"  expand="block" href="/my/NewActivity/Date">Fecha</IonButton>
            </IonList>
            <div className="submit buttons">
                    <IonList className="submit buttons">
                        <IonItem >
                            <IonButton className="save" onClick={()=>{}}>Guardar</IonButton>
                        </IonItem>
                    </IonList>
                </div>
        </IonContent>
    </IonPage>  
    )
}
