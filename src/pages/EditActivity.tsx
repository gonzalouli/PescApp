import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
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
    JSON.parse(window.sessionStorage.getItem("editActivity"))?.name || ""
  );
  const [button, setButton] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({ success: false, message: "" });
  const [toHome, setToHome] = useState(false);
  const [logOut, setLogOut] = useState(false);

  const isAuth = async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      setLogOut(true);
      console.error("Ususario no loggeado: " + error.message);
      return null;
    }
  };

  useEffect(() => {
    try {
      const res = getActivity(isAuth(), sessionStorage.getItem("IdToEdit"));
    } catch (error) {
      setLogOut(true);
    }
  }, []);

  const getActivity = async (CognitoUser, ActivityId) => {
    try {
      const res = await API.post(
        "api9000aeb3",
        "/activities/getActivityWithId",
        {
          body: {
            CognitoUser: CognitoUser,
            ActivityId: ActivityId,
          },
        }
      );
      if (res.error) {
        setError(res);
      }
      console.log(res);
      sessionStorage.setItem("editActivity", JSON.stringify(res));
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const activity = JSON.parse(window.sessionStorage.getItem("editActivity"));
    setName(e.target.value);
    activity.name = name;
    window.sessionStorage.setItem("editActivity", JSON.stringify(activity));
  };

  // const sendNewActivity = async () => {
  //   if (name !== "") {
  //     setButton(false);
  //     try {
  //       const data = await Auth.currentAuthenticatedUser();

  //       const activity = JSON.parse(
  //         window.sessionStorage.getItem("newActivity")
  //       );

  //       const result = await API.post(
  //         "api9000aeb3",
  //         "/activities/insertActivity",
  //         {
  //           body: {
  //             UserIdCognito: data.username,
  //             activity,
  //           },
  //         }
  //       );

  //       if (result.error === true) setError(result);
  //       else setSuccess(result);
  //       setTimeout(() => {
  //         setToHome(true);
  //       }, 2000);
  //     } catch (error) {}
  //     setButton(true);
  //   } else {
  //     setError({ error: true, message: "La actividad requiere un nombre" });
  //   }
  // };

  const [isEditActivityLocalization, setIsEditActivityLocalization] =
    useState(false);
  const [isEditActivityTackle, setIsEditActivityTackle] = useState(false);
  const [isEditActivityCatch, setIsEditActivityCatch] = useState(false);
  const [isEditActivityDate, setIsEditActivityDate] = useState(false);

  return (
    <IonPage>
      {isEditActivityLocalization && (
        <Redirect to="/my/EditActivity/Localization" push={true} exact={true} />
      )}
      {isEditActivityTackle && (
        <Redirect to="/my/EditActivity/Tackle" push={true} exact={true} />
      )}
      {isEditActivityCatch && (
        <Redirect to="/my/EditActivity/Catch" push={true} exact={true} />
      )}
      {isEditActivityDate && (
        <Redirect to="/my/EditActivity/Date" push={true} exact={true} />
      )}
      {toHome && <Redirect to="/my/home" push={true} exact={true} />}
      {logOut && <Redirect to="/" push={true} exact={true} />}
      <Fragment>
        <IonHeader className="header">
          <BackButton refer="/my/MyActivity" />
          <IonTitle className="tittle">Editar Actividad</IonTitle>
        </IonHeader>
        <IonContent>
          {/* <RefreshComponent /> */}
          <IonList className="container">
            <IonItem className="name">
              <IonLabel className="label nameLabel" position="floating">
                Nombre
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
              onClick={() => setIsEditActivityLocalization(true)}
            >
              Localización
            </IonButton>
            <IonButton
              className="main-button"
              expand="block"
              onClick={() => setIsEditActivityTackle(true)}
            >
              Equipo
            </IonButton>
            <IonButton
              className="main-button"
              expand="block"
              onClick={() => setIsEditActivityCatch(true)}
            >
              Capturas
            </IonButton>
            <IonButton
              className="main-button"
              expand="block"
              onClick={() => setIsEditActivityDate(true)}
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
            {/* <IonButton className="save" onClick={button && sendNewActivity}>
              Guardar
            </IonButton> */}
          </div>
        </IonContent>
      </Fragment>
    </IonPage>
  );
}
