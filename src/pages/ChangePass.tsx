import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle } from '@ionic/react'
import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import '../theme/Header.css'
import '../theme/ChangePass.css'
  const ChangePass: React.FC = () => {

    const [oldpass, setOldPass] = useState('')
    const [newpass, setNewPass] = useState('')
    const [repeatpass, setRepeatPass] = useState('')
    const [shownOld, setShownOld] = useState(false)
    const [shownNew, setShownNew] = useState(false)
    const [shownRepeat, setShownRepeat] = useState(false)

    const switchShownOld = () => setShownOld(!shownOld);
    const switchShownNew = () => setShownNew(!shownNew);
    const switchShownRepeat = () => setShownRepeat(!shownRepeat);

    return (
      <IonPage>
            <IonHeader className="header">
                <BackButton refer="/my/profile" />
            </IonHeader>
            <IonContent>
            <IonGrid className="grid-fixed">
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel className="label" position="stacked">Contraseña antigua</IonLabel>
                            <IonInput className="text" type={shownOld ? 'text' : 'password'} value={oldpass} 
                                onIonChange={e=>setOldPass(e.detail.value)}/>
                        </IonItem>
                    </IonCol>
                        <button className='eyebutton' onMouseUp={switchShownOld}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="2" />
                        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                        </svg></button>  
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel className="label" position="stacked">Contraseña nueva</IonLabel>
                            <IonInput className="text" type={shownNew ? 'text' : 'password'} value={newpass}
                            onIonChange={e=>setNewPass(e.detail.value)}/>
                        </IonItem>
                    </IonCol>
                     <button className='eyebutton' ><svg onClick={switchShownNew} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="2" />
                        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                        </svg></button>   
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel className="label" position="stacked">Repetir nueva contraseña</IonLabel>
                            <IonInput className="text" type={shownRepeat ? 'text' : 'password'} value={repeatpass}
                            onIonChange={e=>setRepeatPass(e.detail.value)}/>
                        </IonItem>
                    </IonCol>
                    <button className='eyebutton' onClick={switchShownRepeat}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="2" />
                        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                        </svg></button>
                </IonRow>
            </IonGrid>  
                <div className="submit buttons">
                    <IonList className="submit buttons">
                        <IonItem >
                            <IonButton className="save" onClick={()=>{}}>Guardar</IonButton>
                        </IonItem>
                    </IonList>
                </div>
            </IonContent>
            
      </IonPage>
    );
  };
  
  export default ChangePass;