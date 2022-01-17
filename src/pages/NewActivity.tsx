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
import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router";
import BackButton from "../components/BackButton";
import RefreshComponent from "../components/RefreshComponent";
import "../theme/Header.css";
import "../theme/NewActivity.css";

export default function NewActivity() {
  const [name, setName] = useState(
    JSON.parse(window.sessionStorage.getItem("newActivity"))?.name || ""
  );

  const handleChange = (e) => {
    e.preventDefault();
    const activity = JSON.parse(window.sessionStorage.getItem("newActivity"));
    setName(e.target.value);
    activity.name = name;
    window.sessionStorage.setItem("newActivity", JSON.stringify(activity));
  };

  const sendNewActivity = () => {
    //end sending information
    window.sessionStorage.removeItem("newActivity");
  };

  const [isNewActivityLocalization, setIsNewActivityLocalization] =
    useState<boolean>(false);
  const [isNewActivityTackle, setIsNewActivityTackle] =
    useState<boolean>(false);
  const [isNewActivityCatch, setIsNewActivityCatch] = useState<boolean>(false);
  const [isNewActivityDate, setIsNewActivityDate] = useState<boolean>(false);

  return (
    <IonPage>
      {isNewActivityLocalization && (
        <Redirect to="/my/NewActivity/Localization" push={true} exact={true} />
      )}
      {isNewActivityTackle && (
        <Redirect to="/my/NewActivity/Tackle" push={true} exact={true} />
      )}
      {isNewActivityCatch && (
        <Redirect to="/my/NewActivity/Catch" push={true} exact={true} />
      )}
      {isNewActivityDate && (
        <Redirect to="/my/NewActivity/Date" push={true} exact={true} />
      )}

      <Fragment>
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
              onClick={() => setIsNewActivityTackle(true)}
            >
              Equipo
            </IonButton>
            <IonButton
              className="main-button"
              expand="block"
              onClick={() => setIsNewActivityCatch(true)}
            >
              Capturas
            </IonButton>
            <IonButton
              className="main-button"
              expand="block"
              onClick={() => setIsNewActivityDate(true)}
            >
              Fecha
            </IonButton>
          </IonList>
          <div className="submit buttons">
            <IonButton className="save" onClick={sendNewActivity}>
              Guardar
            </IonButton>
          </div>
        </IonContent>
      </Fragment>
    </IonPage>
  );
}
