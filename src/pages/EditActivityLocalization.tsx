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
import { Component, Suspense, useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import "leaflet-css/dist/leaflet.css";

import "leaflet/dist/leaflet.css";
import "../theme/NewActivityLocalization.css";
import { Redirect } from "react-router";
import EditMapComponent from "../components/EditMapComponent";
import "../theme/EditActivityLocalization.css";
/* initialize() is important for iOS,
    Android doesn't need any initialization.
  */

// prueba de googlemaps

function EditActivityLocalization() {
  const ref = useRef(null);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
  }, []);
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

      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Por favor, espere..."}
      />
      <IonContent>
        <Suspense fallback={<h1>Cargando mapa...</h1>}>
          <EditMapComponent />
        </Suspense>
        <IonList className="form-container">
          <IonItem className="descriptionPlace">
            <IonLabel
              className="label descripcion ion-text-wrap"
              position="stacked"
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

export default EditActivityLocalization;
