import { RefresherEventDetail } from "@ionic/core";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router";
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
      catches: [],
      meteorology: [],
      date: {},
    };
    const ubication = {};
    window.sessionStorage.setItem("newActivity", JSON.stringify(newActivity));
    window.sessionStorage.setItem("ubication", JSON.stringify(ubication));
    // }
  }, []);

  const [isNewActivity, setIsNewActivity] = useState<boolean>(false);
  const [isMeteorology, setIsMeteorology] = useState<boolean>(false);
  const [isDocumentation, setIsDocumentation] = useState<boolean>(false);

  const [wait, setWait] = useState<boolean>(true);

  // if (wait) {
  //   return (
  //     <IonLoading
  //       cssClass="header-loading"
  //       isOpen={wait}
  //       message={"Cargando..."}
  //     />
  //   );
  // }
  return (
    <IonPage>
      {isNewActivity && (
        <Redirect to="/my/NewActivity" push={true} exact={true} />
      )}
      {isMeteorology && (
        <Redirect to="/my/Meteorology" push={true} exact={true} />
      )}
      {isDocumentation && (
        <Redirect to="/my/Documentation" push={true} exact={true} />
      )}

      <div className="profile">
        <IonHeader className="header">
          <MiPerfilButton text="Mi Perfil"></MiPerfilButton>
          <LogOutButton></LogOutButton>
        </IonHeader>
      </div>

      <IonContent>
        {/* // {/* <RefreshComponent /> */}
        <IonList className="container-home">
          <IonButton
            className="main-button"
            expand="block"
            onClick={() => {
              setIsNewActivity(true);
            }}
          >
            Nueva Actividad
          </IonButton>
          <IonButton className="main-button" expand="block">
            Mis Actividades
          </IonButton>
          <IonButton
            className="main-button"
            expand="block"
            onClick={() => {
              setIsMeteorology(true);
            }}
          >
            Meteorología
          </IonButton>
          <IonButton className="main-button" expand="block">
            Especies
          </IonButton>
          <IonButton
            className="main-button"
            expand="block"
            onClick={() => {
              setIsDocumentation(true);
            }}
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
