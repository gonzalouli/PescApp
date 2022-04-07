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
import React, { Component, Suspense, useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import "leaflet-css/dist/leaflet.css";
import { Geolocation } from "@capacitor/geolocation";

import "leaflet/dist/leaflet.css";
import "../theme/NewActivityLocalization.css";
// import MapComponent from "../components/MapComponent";
import { Redirect } from "react-router";
import { ResetLS } from "../utils/ResetLocalStorage";

const MapComponent = React.lazy(() => import("../components/MapComponent")); //
/* initialize() is important for iOS,
  Android doesn't need any initialization.
*/
// prueba de googlemaps

function NewActivityLocalization() {
  const ref = useRef(null);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    ResetLS();
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
  }, []);
  const [text, setText] = useState(
    JSON.parse(window.sessionStorage.getItem("newActivity")).localization
      .text || ""
  );
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleTextChange = (e) => {
    try {
      const activityMod = JSON.parse(
        window.sessionStorage.getItem("newActivity")
      );
      setText(e.target.value);
      activityMod.localization.text = e.target.value;

      window.sessionStorage.setItem("newActivity", JSON.stringify(activityMod));
    } catch (error) {
      <Redirect to="/my/home" push={true} exact={true} />;
    }
  };

  return (
    <IonPage>
      {isConfirmed && (
        <Redirect to="/my/NewActivity" push={true} exact={true} />
      )}
      <IonHeader className="header">
        <BackButton refer="/my/NewActivity" />
        <IonTitle className="tittle">Localización</IonTitle>
      </IonHeader>
      <IonContent>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Por favor, espere..."}
        />
        <Suspense fallback={<h1>Cargando mapa...</h1>}>
          <MapComponent />
        </Suspense>
        <IonList className="form-container">
          <IonItem className="descriptionPlace">
            <IonLabel
              className="label descripcion ion-text-wrap"
              position="floating"
            >
              Descripción del lugar:
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

export default NewActivityLocalization;
