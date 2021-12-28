import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

export default function ResetPass() {
  const [email, setEmail] = useState("");

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/login" />
        <IonTitle className="tittle"></IonTitle>
      </IonHeader>
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
