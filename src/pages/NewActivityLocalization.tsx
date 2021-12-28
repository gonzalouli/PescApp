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

/* initialize() is important for iOS,
  Android doesn't need any initialization.
*/

// prueba de googlemaps

function NewActivityLocalization() {
  const ref = useRef(null);
  const [text, setText] = useState(
    JSON.parse(window.sessionStorage.getItem("newActivity")).localization
      .text || ""
  );

  const handleTextChange = (e) => {
    const activityMod = JSON.parse(
      window.sessionStorage.getItem("newActivity")
    );
    setText(e.target.value);
    activityMod.localization.text = text;
    console.log(e.target.value);

    window.sessionStorage.setItem("newActivity", JSON.stringify(activityMod));
  };

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/my/NewActivity" />
        <IonTitle className="tittle">Localización</IonTitle>
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
          <IonButton className="button-acept">Aceptar</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default NewActivityLocalization;
