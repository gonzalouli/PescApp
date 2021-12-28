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
import { Redirect } from "react-router";
import BackButton from "../components/BackButton";
import RefreshComponent from "../components/RefreshComponent";

export default function Documentation() {
  useEffect(() => {
    // if(JSON.parse(window.sessionStorage.getItem("newActivity"))===null){
    const license = [];

    window.sessionStorage.setItem("license", JSON.stringify(license));

    // }
  }, []);

  const [isNewDocumentation, setIsNewDocumentation] = useState<boolean>(false);
  const [isMyDocumentation, setIsMyDocumentation] = useState<boolean>(false);

  return (
    <IonPage>
      {isNewDocumentation && (
        <Redirect
          to="/my/Documentation/NewDocumentation"
          push={true}
          exact={true}
        />
      )}
      {isMyDocumentation && (
        <Redirect
          to="/my/Documentation/MyDocumentation"
          push={true}
          exact={true}
        />
      )}
      <IonHeader className="header">
        <BackButton refer="/my/home" />
        <IonTitle className="tittle">Documentación</IonTitle>
      </IonHeader>
      <IonContent>
        <RefreshComponent />
        <IonList className="container">
          <IonButton
            className="main-button"
            expand="block"
            onClick={() => {
              setIsNewDocumentation(true);
            }}
          >
            Nueva
          </IonButton>
          <IonButton
            className="main-button"
            expand="block"
            onClick={() => {
              setIsMyDocumentation(true);
            }}
          >
            Mi Documentacion
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
