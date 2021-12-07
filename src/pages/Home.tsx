import { IonButton, IonHeader, IonIcon, IonPage, IonTitle } from '@ionic/react'
import React from 'react'
import LogOutButton from '../components/LogOutButton'
import MiPerfilButton from '../components/MiPerfilButton'
import '../theme/Header.css'

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="header">
                <MiPerfilButton text="Mi Perfil"></MiPerfilButton>
                <LogOutButton></LogOutButton>
            </IonHeader>

        </IonPage>  
    )
}

export default Home
