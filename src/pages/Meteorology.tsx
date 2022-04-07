import React, { Fragment, Suspense, useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
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
import ShowMeteorology from "../components/ShowMeteorology";
import "../theme/Header.css";
import { API, Auth } from "aws-amplify";
import moment from "moment";

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Meteorology() {
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(7, "d").format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(minDate);
  const [name, setName] = useState("");
  const [MiUbicacion, setMiUbicacion] = useState(false);
  const [status, setStatus] = useState({
    message: "",
    error: false,
  });
  const [showLoading, setShowLoading] = useState(false);
  const [haveMeteorology, setHaveMeteorology] = useState(false);
  const [response, setResponse] = useState({});

  const handleChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const miUbicacion = async () => {
    setShowLoading(true);

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
      setShowLoading(false);
    }, 1000);
  };

  const searchMeteorology = async () => {
    setShowLoading(true);

    const coords = JSON.parse(
      window.sessionStorage.getItem("ubication")
    ).coords;
    const lat = coords.lat;
    const lng = coords.lng;
    const data = { lat, lng };

    try {
      if (name === "") {
        const res = await API.post(
          "api9000aeb3",
          "/meteorology/getMeteorology",
          {
            body: {
              data,
            },
          }
        );
        if (res.error) {
          setStatus(res);
        } else {
          setResponse(res);
          setHaveMeteorology(true);
        }
      } else {
        const res = await API.post(
          "api9000aeb3",
          "/meteorology/getMeteorology",
          {
            body: {
              name: name.replace("ñ", "n").replace("Ñ", "N"),
            },
          }
        );
        if (res.error) {
          setStatus(res);
        } else {
          setResponse(res);
          setHaveMeteorology(true);
        }
      }
    } catch (e) {
      // setStatus({
      //   error: true,
      //   message: "No existe la ciudad escrita o no está bien escrita...",
      // });
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    setShowLoading(true);

    setTimeout(() => {
      setShowLoading(false);
    }, 1000);
  }, []);

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/my/MeteorologyOrTide" />
        <IonTitle className="tittle">Meteorología</IonTitle>
      </IonHeader>
      <IonContent>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Por favor, espere..."}
        />
        {!haveMeteorology && (
          <Fragment>
            <IonList className="container">
              <IonButton className="button miUbicacion" onClick={miUbicacion}>
                Mi ubicación
              </IonButton>
              {MiUbicacion && (
                <IonItem>
                  <IonLabel className="label ion-text-wrap ion-text-center selected">
                    Ubicación actual seleccionada
                  </IonLabel>
                </IonItem>
              )}
              <IonItem className="label selectUbication">
                <IonLabel>Selecciona ubicación</IonLabel>
              </IonItem>
            </IonList>
            <Suspense fallback={<h1>Cargando mapa...</h1>}>
              <MeteorologyMapComponent />
            </Suspense>
            <IonItem className="writeOption">
              <IonLabel className="label">O escríbala:</IonLabel>
              <IonInput
                className="text"
                type="text"
                value={name}
                onIonChange={handleChangeName}
              />
            </IonItem>
            {status.error && <div className="error">{status.message}</div>}
            <IonItem className="writeOption">
              <IonLabel className="label">Fechas disponibles: </IonLabel>
              <IonDatetime
                min={minDate}
                max={maxDate}
                value={selectedDate}
                defaultValue={minDate}
                onIonChange={(e) => {
                  setSelectedDate(e.detail.value);
                }}
                displayFormat="YYYY-MM-DD"
              ></IonDatetime>
            </IonItem>
            <IonButton className="save" onClick={searchMeteorology}>
              Buscar
            </IonButton>
          </Fragment>
        )}
        {haveMeteorology && (
          <ShowMeteorology props={{ response, selectedDate }} />
        )}
      </IonContent>
    </IonPage>
  );
}
