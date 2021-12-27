import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import BackButton from "../components/BackButton";
import RefreshComponent from "../components/RefreshComponent";
import "../theme/Header.css";
import "../theme/NewActivity.css";

export default function NewActivity() {
  const [name, setName] = useState(
    JSON.parse(window.sessionStorage.getItem("newActivity")).name || ""
  );

  const [isNewActivityLocalization, setIsNewActivityLocalization] =
    useState(false);

  const handleChange = (e) => {
    const activity = JSON.parse(window.sessionStorage.getItem("newActivity"));
    setName(e.target.value);
    activity.name = name;
    window.sessionStorage.setItem("newActivity", JSON.stringify(activity));
  };

  const sendNewActivity = () => {
    //end sending information
    window.sessionStorage.removeItem("newActivity");
  };

  return (
    <IonPage>
      {isNewActivityLocalization && (
        <Redirect to="/my/NewActivity/Localization" push={true} exact={true} />
      )}
      <IonHeader className="header">
        <BackButton refer="/my/home" />
        <IonTitle className="tittle">Nueva Actividad</IonTitle>
      </IonHeader>
      <IonContent>
        <RefreshComponent />
        <IonList className="container">
          <IonItem className="name">
            <IonLabel className="label" position="floating">
              Nombre
            </IonLabel>
            <IonInput
              className="text"
              type="text"
              value={name}
              onIonChange={handleChange}
            />
          </IonItem>
          <IonButton
            className="main-button"
            expand="block"
            onClick={() => setIsNewActivityLocalization(true)}
          >
            Localización
          </IonButton>
          <IonButton
            className="main-button"
            expand="block"
            href="/my/NewActivity/Tackle"
          >
            Equipo
          </IonButton>
          <IonButton
            className="main-button"
            expand="block"
            href="/my/NewActivity/Catch"
          >
            Capturas
          </IonButton>
          <IonButton
            className="main-button"
            expand="block"
            href="/my/NewActivity/Date"
          >
            Fecha
          </IonButton>
        </IonList>
        <div className="submit buttons">
          <IonList className="submit buttons">
            <IonItem>
              <IonButton
                className="save"
                onClick={sendNewActivity}
                href="/my/home"
              >
                Guardar
              </IonButton>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
