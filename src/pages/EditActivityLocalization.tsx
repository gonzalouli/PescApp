import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTextarea,
  IonTitle,
  IonToast,
} from "@ionic/react";
import React, { Component, useEffect, useRef, useState } from "react";
import RefreshComponent from "../components/RefreshComponent";
import BackButton from "../components/BackButton";
import "leaflet-css/dist/leaflet.css";
import { Geolocation } from "@capacitor/geolocation";

import "leaflet/dist/leaflet.css";
import "../theme/NewActivityLocalization.css";
import MapComponent from "../components/MapComponent";
import { Redirect } from "react-router";
import { ResetLS } from "../utils/ResetLocalStorage";

/* initialize() is important for iOS,
    Android doesn't need any initialization.
  */

// prueba de googlemaps

function EditActivityLocalization() {
  const ref = useRef(null);

  useEffect(() => {});
  const [text, setText] = useState(
    JSON.parse(window.sessionStorage.getItem("editActivity")).localization
      .text || ""
  );
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleTextChange = (e) => {
    try {
      const activityMod = JSON.parse(
        window.sessionStorage.getItem("newActivity")
      );
      setText(e.target.value);
      activityMod.localization.text = text;

      window.sessionStorage.setItem("newActivity", JSON.stringify(activityMod));
    } catch (error) {
      <Redirect to="/my/home" push={true} exact={true} />;
    }
  };

  return (
    <IonPage>
      {isConfirmed && (
        <Redirect to="/my/EditActivity" push={true} exact={true} />
      )}
      <IonHeader className="header">
        <BackButton refer="/my/EditActivity" />
        <IonTitle className="tittle">Editar Localización</IonTitle>
      </IonHeader>
      <IonContent>
        <MapComponent />
        <IonList className="form-container">
          <IonItem className="description">
            <IonLabel className="label" position="floating">
              Descripción
            </IonLabel>
            <IonTextarea
              value={text}
              onIonChange={handleTextChange}
            ></IonTextarea>
          </IonItem>
          <IonButton
            className="button-acept"
            onClick={() => setIsConfirmed(true)}
          >
            Aceptar
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default EditActivityLocalization;
