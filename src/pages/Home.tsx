import { RefresherEventDetail } from '@ionic/core'
import { IonButton, IonContent, IonHeader, IonIcon, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import LogOutButton from '../components/LogOutButton'
import MiPerfilButton from '../components/MiPerfilButton'
import RefreshComponent from '../components/RefreshComponent'
import '../theme/Header.css'
import '../theme/Home.css'

const Home: React.FC = () => {

   
      
    return (
        
        
        <IonPage>
            <IonHeader className="header">
                    <MiPerfilButton text="Mi Perfil"></MiPerfilButton>
                    <LogOutButton></LogOutButton>
            </IonHeader>
            <IonContent>
               <RefreshComponent/>
                <IonList className="container">
                    <IonButton className="main-button" expand="block" href="my/newActivity">Nueva Actividad</IonButton>
                    <IonButton className="main-button"  expand="block">Mis Actividades</IonButton>
                    <IonButton className="main-button"  expand="block">Meteorología</IonButton>
                    <IonButton className="main-button"  expand="block">Especies</IonButton>
                    <IonButton className="main-button"  expand="block">Documentación</IonButton>
                    <IonButton className="main-button"  expand="block">Notificaciones</IonButton>
                </IonList>
            </IonContent>
        </IonPage>  
    )
}

export default Home
