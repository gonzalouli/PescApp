import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle } from '@ionic/react'
import React, { useEffect } from 'react'
import BackButton from '../components/BackButton'
import RefreshComponent from '../components/RefreshComponent'

export default function Documentation() {

    useEffect(()=>{
        // if(JSON.parse(window.sessionStorage.getItem("newActivity"))===null){
            const license = []
           
            window.sessionStorage.setItem("license",JSON.stringify(license))

        // }

    },[])   

    return (
    <IonPage>
        <IonHeader className="header">
                <BackButton refer="/my/home" />
                <IonTitle className='tittle' >Documentación</IonTitle>
        </IonHeader>
        <IonContent>
            <RefreshComponent/>
            <IonList className="container">
                <IonButton className="main-button"  expand="block" href="/my/Documentation/NewDocumentation">Nueva</IonButton>
                <IonButton className="main-button"  expand="block" href="/my/Documentation/MyDocumentation">Mi Documentacion</IonButton>
            </IonList>
          
        </IonContent>
    </IonPage>  
    )
}
