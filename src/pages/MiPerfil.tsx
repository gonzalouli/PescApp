import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle } from '@ionic/react'
import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import '../theme/Header.css'
import '../theme/MiPerfil.css'

const MiPerfil: React.FC = () => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('')
    const [dni, setDni] = useState('')

    return (
      <IonPage>
            <IonHeader className="header">
                <BackButton refer="/my/home" />
                <IonTitle className="tittle">Mi Perfil</IonTitle>
            </IonHeader>
            <IonContent>
            <IonList className="container" >
                <IonItem>
                    IMAGEN
                </IonItem>
            </IonList >
            <IonList className="container">
                <IonItem className="formItem ">
                    <IonLabel className="label" position="stacked">Nombre</IonLabel>
                    <IonInput className="text" type="text" value={name}  placeholder={name}
                    onIonChange={e=>setName(e.detail.value)}/>            
                </IonItem>
                <IonItem className="formItem">
                    <IonLabel className="label" position="stacked">Apellidos</IonLabel>
                    <IonInput className="text" type="text" value={surname} placeholder={surname}
                    onIonChange={e=>setSurname(e.detail.value)}/>       
                </IonItem>
                <IonItem className="formItem">
                    <IonLabel className="label" position="stacked">Email</IonLabel>
                    <IonInput className="text" type="text" value={email} placeholder={email}
                    onIonChange={e=>setEmail(e.detail.value)}/>       
                </IonItem>
                <IonItem className="formItem">
                    <IonLabel className="label" position="stacked">DNI</IonLabel>
                    <IonInput className="text" type="text" value={dni} placeholder={dni}
                    onIonChange={e=>setDni(e.detail.value)}/>       
                </IonItem>
            </IonList>  
                <div className="buttons">
                        <IonButton className="save" href="/my/changePass">
                                Cambiar contraseña
                        </IonButton>
                </div>
                <div className="buttons">
                        <IonButton className="save">Guardar</IonButton>
                </div>

            </IonContent>
      </IonPage>
    );
  };
  
  export default MiPerfil;