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
      catch: [],
      meteorology: [],
      date: {},
    };
    const ubication = {};
    window.sessionStorage.setItem("newActivity", JSON.stringify(newActivity));
    window.sessionStorage.setItem("ubication", JSON.stringify(ubication));
    // }
  }, []);

  const [wait, setWait] = useState<boolean>(true);
  const [isNewActivity, setIsNewActivity] = useState<boolean>(false);
  const [isMeteorology, setIsMeteorology] = useState<boolean>(false);
  const [isDocumentation, setIsDocumentation] = useState<boolean>(false);

  // name: "",
  // localization: {text:" ", coords: { lat:null, lng:null}},
  // tackle: [{id:0, nombre:""}],
  // catch: [{id:0 , nombre: "", imageUrl: process.env.PUBLIC_URL+'/assets/placeholderimage.jpg'}],
  // date: { fInicio: "", fFin: "", hInicio: "", hFin: ""},
  // meteorology:[{}]

  // JSON.parse(window.sessionStorage.getItem('newActivity'))
  return (
    <IonPage>
      {wait && (
        <IonLoading
          cssClass="my-custom-class"
          isOpen={wait}
          onDidDismiss={() => setWait(false)}
          message={"Cargando..."}
          duration={100}
        />
      )}
      {isNewActivity && (
        <Redirect to="/my/NewActivity" push={true} exact={true} />
      )}
      {isMeteorology && (
        <Redirect to="/my/Meteorology" push={true} exact={true} />
      )}
      {isDocumentation && (
        <Redirect to="/my/Documentation" push={true} exact={true} />
      )}

      {!wait && (
        <Fragment>
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
                onClick={() => setIsNewActivity(true)}
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
        </Fragment>
      )}
    </IonPage>
  );
};

export default Home;
