import { IonButton, IonInput, IonItem, IonLabel, IonList } from '@ionic/react'
import React, { useEffect, useState } from 'react'

export default function ResetPass() {

    const [email, setEmail]=useState('')

    return (
        <IonList>
        <IonItem>
            <IonLabel className="label" position="stacked">Email</IonLabel>
            <IonInput className="text" type="password" value={email} placeholder="Email de recuperacion"
                onIonChange={e => setEmail(e.detail.value)} />
        </IonItem>
            <IonButton className="entrar" type="submit" expand="block" href="/my/home" >Enviar</IonButton>
        </IonList>
    )
}
