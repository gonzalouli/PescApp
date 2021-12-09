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
                        <button className='eyebutton' onMouseUp={switchShownOld}>{shownOld ? <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="2" />
                        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="3" y1="3" x2="21" y2="21" />
                        <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                        <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
</svg>}</button>  
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel className="label" position="stacked">Contraseña nueva</IonLabel>
                            <IonInput className="text" type={shownNew ? 'text' : 'password'} value={newpass}
                            onIonChange={e=>setNewPass(e.detail.value)}/>
                        </IonItem>
                    </IonCol>
                     <button className='eyebutton' onMouseUp={switchShownNew} >{shownNew ? <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="2" />
                        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="3" y1="3" x2="21" y2="21" />
                        <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                        <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                    </svg>}</button>   
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel className="label" position="stacked">Repetir nueva contraseña</IonLabel>
                            <IonInput className="text" type={shownRepeat ? 'text' : 'password'} value={repeatpass}
                            onIonChange={e=>setRepeatPass(e.detail.value)}/>
                        </IonItem>
                    </IonCol>
                    <button className='eyebutton' onClick={switchShownRepeat}>{shownRepeat ? <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="2" />
                        <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="3" y1="3" x2="21" y2="21" />
                        <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                        <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                    </svg>}</button>
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