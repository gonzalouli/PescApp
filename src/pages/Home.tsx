import { RefresherEventDetail } from "@ionic/core";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import LogOutButton from "../components/LogOutButton";
import MiPerfilButton from "../components/MiPerfilButton";
import RefreshComponent from "../components/RefreshComponent";
import "../theme/Header.css";
import "../theme/Home.css";

const Home: React.FC = () => {
  useEffect(() => {
    // if(JSON.parse(window.sessionStorage.getItem("newActivity"))===null){
    const newActivity = {
      name: "",
      localization: {},
      tackle: [],
      catch: [],
      meteorology: [],
      date: {},
    };
    const ubication = {};
    window.sessionStorage.setItem("newActivity", JSON.stringify(newActivity));
    window.sessionStorage.setItem("ubication", JSON.stringify(ubication));

    // }
  }, []);

  // name: "",
  // localization: {text:" ", coords: { lat:null, lng:null}},
  // tackle: [{id:0, nombre:""}],
  // catch: [{id:0 , nombre: "", imageUrl: process.env.PUBLIC_URL+'/assets/placeholderimage.jpg'}],
  // date: { fInicio: "", fFin: "", hInicio: "", hFin: ""},
  // meteorology:[{}]

  // JSON.parse(window.sessionStorage.getItem('newActivity'))
  return (
    <IonPage>
      <IonHeader className="header">
        <MiPerfilButton text="Mi Perfil"></MiPerfilButton>
        <LogOutButton></LogOutButton>
      </IonHeader>
      <IonContent>
        <RefreshComponent />
        <IonList className="container-home">
          <IonButton
            className="main-button"
            expand="block"
            href="my/NewActivity"
          >
            Nueva Actividad
          </IonButton>
          <IonButton className="main-button" expand="block">
            Mis Actividades
          </IonButton>
          <IonButton
            className="main-button"
            expand="block"
            href="my/Meteorology"
          >
            Meteorología
          </IonButton>
          <IonButton className="main-button" expand="block">
            Especies
          </IonButton>
          <IonButton
            className="main-button"
            expand="block"
            href="my/Documentation"
          >
            Documentación
          </IonButton>
          <IonButton className="main-button" expand="block">
            Notificaciones
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
