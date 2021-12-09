import { RefresherEventDetail } from '@ionic/core'
import { IonButton, IonContent, IonHeader, IonIcon, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import LogOutButton from '../components/LogOutButton'
import MiPerfilButton from '../components/MiPerfilButton'
import '../theme/Header.css'
import '../theme/Home.css'

const Home: React.FC = () => {

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
      
        setTimeout(() => {
          console.log('Async operation has ended');
          event.detail.complete();
        }, 2000);
      }
      
    return (
        
        
        <IonPage>
            <IonHeader className="header">
                    <MiPerfilButton text="Mi Perfil"></MiPerfilButton>
                    <LogOutButton></LogOutButton>
            </IonHeader>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={40} pullMax={80}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList className="container">
                    <IonButton className="main-button" expand="block" href="my/newActivity">Nueva Actividad</IonButton>
                    <IonButton className="main-button"  expand="block">Mis Actividades</IonButton>
                    <IonButton className="main-button"  expand="block">Meteorología</IonButton>
                    <IonButton className="main-button"  expand="block">Especies piscícolas</IonButton>
                    <IonButton className="main-button"  expand="block">Documentación</IonButton>
                    <IonButton className="main-button"  expand="block">Notificaciones</IonButton>
                </IonList>
            </IonContent>
        </IonPage>  
    )
}

export default Home
