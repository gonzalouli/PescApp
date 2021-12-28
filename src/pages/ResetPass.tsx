import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

export default function ResetPass() {
  const [email, setEmail] = useState("");

  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel className="label" position="stacked">
              Email
            </IonLabel>
            <IonInput
              className="text"
              type="password"
              value={email}
              placeholder="Email de recuperacion"
              onIonChange={(e) => setEmail(e.detail.value)}
            />
          </IonItem>
          <IonButton className="entrar" type="submit" expand="block">
            Enviar
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
