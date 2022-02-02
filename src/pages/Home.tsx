import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import LogOutButton from "../components/LogOutButton";
import MiPerfilButton from "../components/MiPerfilButton";
import { Auth } from "aws-amplify";

import "../theme/Header.css";
import "../theme/Home.css";

const Home: React.FC = () => {
  const [logOut, setLogOut] = useState(false);

  useEffect(() => {
    // if(JSON.parse(window.sessionStorage.getItem("newActivity"))===null){
    const newActivity = {
      name: "",
      localization: {},
      tackle: [],
      catches: [],
      date: {},
    };
    const ubication = {};
    window.sessionStorage.setItem("newActivity", JSON.stringify(newActivity));
    window.sessionStorage.setItem("ubication", JSON.stringify(ubication));
    // }
    if (
      Auth.currentAuthenticatedUser() == null ||
      Auth.currentAuthenticatedUser() === undefined
    ) {
      setLogOut(true);
    }
  }, []);

  const [isNewActivity, setIsNewActivity] = useState<boolean>(false);
  const [isMeteorology, setIsMeteorology] = useState<boolean>(false);
  const [isDocumentation, setIsDocumentation] = useState<boolean>(false);
  const [isMyActivity, setIsMyActivity] = useState<boolean>(false);

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
        <Redirect to="/my/MeteorologyOrTide" push={true} exact={true} />
      )}
      {isDocumentation && (
        <Redirect to="/my/Documentation" push={true} exact={true} />
      )}
      {isMyActivity && (
        <Redirect to="/my/MyActivity" push={true} exact={true} />
      )}
      {logOut && <Redirect to="/" push={true} exact={true} />}

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
          <IonButton
            className="main-button"
            expand="block"
            onClick={() => {
              setIsMyActivity(true);
            }}
          >
            Mis Actividades
          </IonButton>
          <IonButton
            className="main-button"
            expand="block"
            onClick={() => {
              setIsMeteorology(true);
            }}
          >
            Tiempo y Mareas
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
