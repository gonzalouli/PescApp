import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { API, Auth } from "aws-amplify";
import { Redirect } from "react-router";
import { getDefaultNormalizer } from "@testing-library/react";

export default function MyActivityWithId() {
  const [error, setError] = useState({ error: false, message: "" });
  const [logOut, setLogOut] = useState(false);
  const [result, setResult] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      if (localStorage.getItem("id") != null) {
        const aux = await getActivity(await isAuth());
        setResult(aux);
      }
    } catch (error) {
      setLogOut(true);
    }
  };

  const isAuth = async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      setLogOut(true);
      console.error("Ususario no loggeado: " + error.message);
    }
  };

  const getActivity = async (CognitoUser) => {
    try {
      const result = await API.post(
        "api9000aeb3",
        "/activities/getActivityWithId",
        {
          body: {
            CognitoUser: CognitoUser,
            ActivityId: localStorage.getItem("id"),
          },
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      setError({ error: true, message: "Error consulte al adrministrador" });
    }
  };

  return (
    <IonPage>
      {logOut && <Redirect to="/" push={true} exact={true} />}

      <Fragment>
        <IonHeader className="header">
          <BackButton refer="/my/home" />
          <IonTitle className="tittle">Mis Actividades</IonTitle>
        </IonHeader>
        <IonContent>
          <IonGrid className="grid-row">
            <IonRow className="row">
              <IonItemDivider className="itemDivider">
                <IonCol className="topItem label ">Nombre</IonCol>
                <IonCol className="topItem label ">Fecha de creación</IonCol>
                <IonCol className="topItem label ">Editar</IonCol>
                <IonCol className="topItem label">Borrar</IonCol>
              </IonItemDivider>
            </IonRow>
          </IonGrid>
          {error.error === true && (
            <IonItem>
              <IonLabel className="error ion-text-wrap">
                {error.message}
              </IonLabel>
            </IonItem>
          )}
        </IonContent>
      </Fragment>
    </IonPage>
  );
}
