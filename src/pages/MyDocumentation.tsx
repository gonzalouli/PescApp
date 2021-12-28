import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
} from "@ionic/react";
import React from "react";
import BackButton from "../components/BackButton";

export default function MyDocumentation() {
  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/my/Documentation" />
        <IonTitle className="tittle">My Doc</IonTitle>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
}
