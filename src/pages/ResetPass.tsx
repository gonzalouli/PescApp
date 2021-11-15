import { IonInput, IonItem, IonLabel } from '@ionic/react'
import React, { useState } from 'react'

export default function ResetPass() {

    const [email, setEmail]=useState('')

    return (
        <IonItem>
            <IonLabel className="label" position="stacked">Email</IonLabel>
            <IonInput className="text" type="password" value={email} placeholder="Email de recuperacion"
             onIonChange={e=>setEmail(e.detail.value)}/>            
          </IonItem>
          
    )
}
