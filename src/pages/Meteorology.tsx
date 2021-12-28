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

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Meteorology() {
  const [date, setDate] = useState(new Date().toISOString());
  const [MiUbicacion, setMiUbicacion] = useState(false);

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

  const searchMeteorology = () => {
    // const coords = JSON.parse(window.sessionStorage.getItem("ubication")).coords
    // const lat = coords.lat.toFixed(2)
    // const lng = coords.lng.toFixed(2)
    // const dateToSend = JSON.parse(window.sessionStorage.getItem("ubication")).date
    // console.log("realizando consulta")
    // // axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&type=hour&start={dateToSend}&appid=50e8e2818ca388308c0616ddc6f32c94`).then(resp => console.log(resp))
    //llamar al backend
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
        <IonItem>
          <IonLabel>Fecha</IonLabel>
          <IonDatetime
            displayFormat="YYYY MM DD"
            value={date}
            onIonChange={(e) => {
              setDate(e.detail.value!);
              const ubication = JSON.parse(
                window.sessionStorage.getItem("ubication")
              );
              ubication.date = date;
              window.sessionStorage.setItem(
                "ubication",
                JSON.stringify(ubication)
              );
            }}
          ></IonDatetime>
        </IonItem>

        <div className="submit buttons">
          <IonList className="submit buttons">
            <IonItem>
              <IonButton className="save" onClick={searchMeteorology}>
                Buscar
              </IonButton>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
