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
  IonTitle,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router";
import BackButton from "../components/BackButton";
import "../theme/Header.css";
import "../theme/NewActivity.css";
import { API, Auth } from "aws-amplify";
import { ResetLS } from "../utils/ResetLocalStorage";

export default function NewActivity() {
  const [name, setName] = useState(
    JSON.parse(window.sessionStorage.getItem("newActivity"))?.name || ""
  );
  const [button, setButton] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({ success: false, message: "" });
  const [toHome, setToHome] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    ResetLS();
    try {
      Auth.currentAuthenticatedUser();
    } catch (error) {
      setLogOut(true);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const activity = JSON.parse(window.sessionStorage.getItem("newActivity"));
    setName(e.target.value);
    activity.name = e.target.value;
    window.sessionStorage.setItem("newActivity", JSON.stringify(activity));
  };

  const sendNewActivity = async () => {
    if (name !== "") {
      setShowLoading(true);
      setButton(false);
      try {
        const data = await Auth.currentAuthenticatedUser();

        const activity = JSON.parse(
          window.sessionStorage.getItem("newActivity")
        );

        const result = await API.post(
          "api9000aeb3",
          "/activities/insertActivity",
          {
            body: {
              UserIdCognito: data.username,
              activity,
            },
          }
        );

        if (result.error === true) setError(result);
        else setSuccess(result);
        setTimeout(() => {
          setToHome(true);
        }, 2000);
      } catch (error) {}
      setButton(true);
      setShowLoading(false);
    } else {
      setError({ error: true, message: "La actividad requiere un nombre" });
    }
  };

  const [isNewActivityLocalization, setIsNewActivityLocalization] =
    useState<boolean>(false);
  const [isNewActivityTackle, setIsNewActivityTackle] =
    useState<boolean>(false);
  const [isNewActivityCatch, setIsNewActivityCatch] = useState<boolean>(false);
  const [isNewActivityDate, setIsNewActivityDate] = useState<boolean>(false);

  return (
    <IonPage>
      {isNewActivityLocalization && (
        <Redirect to="/my/NewActivity/Localization" push={true} exact={true} />
      )}
      {isNewActivityTackle && (
        <Redirect to="/my/NewActivity/Tackle" push={true} exact={true} />
      )}
      {isNewActivityCatch && (
        <Redirect to="/my/NewActivity/Catch" push={true} exact={true} />
      )}
      {isNewActivityDate && (
        <Redirect to="/my/NewActivity/Date" push={true} exact={true} />
      )}
      {toHome && <Redirect to="/my/home" push={true} exact={true} />}
      {logOut && <Redirect to="/" push={true} exact={true} />}
      <Fragment>
        <IonHeader className="header">
          <BackButton refer="/my/home" />
          <IonTitle className="tittle">Nueva Actividad</IonTitle>
        </IonHeader>
        <IonContent>
          {/* <RefreshComponent /> */}
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Por favor, espere..."}
            duration={3000}
          />
          <IonList className="container">
            <IonItem className="name">
              <IonLabel
                color="secondary"
                className="label nameLabel ion-text-wrap"
                position="floating"
              >
                Introduzca el nombre aquí...
              </IonLabel>
              <IonInput
                className="text"
                type="text"
                value={name}
                onIonChange={handleChange}
              />
            </IonItem>
            <IonButton
              className="main-button"
              expand="block"
              onClick={() => setIsNewActivityLocalization(true)}
            >
              Localización
            </IonButton>
            <IonButton
              className="main-button"
              expand="block"
              onClick={() => setIsNewActivityTackle(true)}
            >
              Equipo
            </IonButton>
            <IonButton
              className="main-button"
              expand="block"
              onClick={() => setIsNewActivityCatch(true)}
            >
              Fotografías
            </IonButton>
            <IonButton
              className="main-button"
              expand="block"
              onClick={() => setIsNewActivityDate(true)}
            >
              Fecha
            </IonButton>
          </IonList>
          {error.error === true && (
            <IonItem>
              <IonLabel className="error ion-text-wrap">
                {error.message}
              </IonLabel>
            </IonItem>
          )}
          {success.success === true && (
            <IonItem>
              <IonLabel className="success label">{success.message}</IonLabel>
            </IonItem>
          )}

          <div className="submit buttons">
            <IonButton className="save" onClick={button && sendNewActivity}>
              Guardar
            </IonButton>
          </div>
        </IonContent>
      </Fragment>
    </IonPage>
  );
}
