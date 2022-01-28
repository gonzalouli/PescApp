import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
} from "@ionic/react";
import React, { useState } from "react";
import { Redirect } from "react-router";
import BackButton from "../components/BackButton";

export default function MereorologyOrTide() {
  const [isMeteorologyPage, setIsMeteorologyPage] = useState(false);
  const [isTidePage, setIsTidePage] = useState(false);

  return (
    <IonPage>
      {isMeteorologyPage && (
        <Redirect to="/my/Meteorology" push={true} exact={true} />
      )}
      {isTidePage && <Redirect to="/my/Tide" push={true} exact={true} />}
      <IonHeader className="header">
        <BackButton refer="/my/home" />
        <IonTitle className="tittle">Tiempo y Mareas</IonTitle>
      </IonHeader>
      <IonContent>
        <IonButton
          className="main-button"
          expand="block"
          onClick={() => {
            setIsMeteorologyPage(true);
          }}
        >
          Meteorología
        </IonButton>
        <IonButton
          className="main-button"
          expand="block"
          onClick={() => {
            setIsTidePage(true);
          }}
        >
          Mareas
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
