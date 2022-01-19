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
import { Auth } from "aws-amplify";

export default function ResetPass() {
  const [email, setEmail] = useState("");

  const handleChangePass = () => {
    try {
      Auth.forgotPassword(email);
    } catch (error) {}
  };

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
          <IonButton
            className="entrar"
            onClick={handleChangePass}
            expand="block"
          >
            Enviar
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
