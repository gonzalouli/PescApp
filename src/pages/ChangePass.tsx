import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle } from '@ionic/react'
import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import '../theme/Header.css'
import '../theme/ChangePass.css'
  const ChangePass: React.FC = () => {

    const [oldpass, setOldPass] = useState('')
    const [newpass, setNewPass] = useState('')
    const [repeatpass, setRepeatPass] = useState('')

    return (
      <IonPage>
            <IonHeader className="header">
                <BackButton refer="/my/profile" />
            </IonHeader>
            <IonContent>
            <IonList className="form" >
                <IonItem>
                    <IonLabel className="label" position="stacked">Contraseña antigua</IonLabel>
                    <IonInput className="text" type="password" value={oldpass} 
                    onIonChange={e=>setOldPass(e.detail.value)}/>            
                </IonItem>
                <IonItem>
                    <IonLabel className="label" position="stacked">Contraseña nueva</IonLabel>
                    <IonInput className="text" type="password" value={newpass}
                    onIonChange={e=>setNewPass(e.detail.value)}/>       
                </IonItem>
                <IonItem>
                    <IonLabel className="label" position="stacked">Repetir contraseña</IonLabel>
                    <IonInput className="text" type="password" value={repeatpass}
                    onIonChange={e=>setRepeatPass(e.detail.value)}/>       
                </IonItem>
            </IonList>  
                <div className="submit buttons">
                    <IonList className="submit buttons">
                        <IonItem >
                            <IonButton onClick={()=>{}}>Guardar</IonButton>
                        </IonItem>
                    </IonList>
                </div>
            </IonContent>
      </IonPage>
    );
  };
  
  export default ChangePass;