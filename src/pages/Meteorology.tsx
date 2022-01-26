import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonDatetime,
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
import BackButton from "../components/BackButton";
import RefreshComponent from "../components/RefreshComponent";
import { Geolocation } from "@capacitor/geolocation";
import "../theme/Meteorology.css";
import MeteorologyMapComponent from "../components/MeteorologyMapComponent";
import MapComponent from "../components/MapComponent";
import axios from "axios";
import "../theme/Header.css";
import { API, Auth } from "aws-amplify";

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Meteorology() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [MiUbicacion, setMiUbicacion] = useState(false);
  const [status, setStatus] = useState({
    message: "error al ver el municipio",
    error: true,
  });

  const handleChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const miUbicacion = async () => {
    const position = await Geolocation.getCurrentPosition();
    const ubication = JSON.parse(window.sessionStorage.getItem("ubication"));
    ubication.coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    window.sessionStorage.setItem("ubication", JSON.stringify(ubication));

    setMiUbicacion(true);
    setTimeout(() => {
      setMiUbicacion(false);
    }, 2000);
  };

  const searchMeteorology = async () => {
    const coords = JSON.parse(
      window.sessionStorage.getItem("ubication")
    ).coords;
    const lat = coords.lat;
    const lng = coords.lng;
    const data = { lat, lng };

    const response = await API.post(
      "api9000aeb3",
      "/meteorology/getMeteorology",
      {
        body: {
          data,
        },
      }
    );
  };

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/my/home" />
        <IonTitle className="tittle">Meteorología</IonTitle>
      </IonHeader>
      <IonContent>
        <IonList className="container">
          <IonButton className="button miUbicacion" onClick={miUbicacion}>
            Mi ubicación
          </IonButton>
          {MiUbicacion && (
            <IonItem>
              <IonLabel className="selected">
                Ubicacion actual seleccionada
              </IonLabel>
            </IonItem>
          )}
          <IonItem className="label">
            <IonLabel>Selecciona ubicación</IonLabel>
          </IonItem>
        </IonList>
        <MeteorologyMapComponent />

        <IonItem className="writeOption">
          <IonLabel className="label">O escribelo:</IonLabel>
          <IonInput
            className="text"
            type="text"
            value={name}
            onIonChange={handleChangeName}
          />
        </IonItem>
        {status.error && <div className="error">{status.message}</div>}

        <IonButton className="save" onClick={searchMeteorology}>
          Buscar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
