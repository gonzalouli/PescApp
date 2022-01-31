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
  IonText,
  IonTitle,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { API, Auth } from "aws-amplify";
import { Redirect } from "react-router";
import { getDefaultNormalizer } from "@testing-library/react";
import "../theme/MyActivityWithId.css";
import ShowMapComponent from "../components/ShowMapComponent";

export default function MyActivityWithId() {
  const [error, setError] = useState({ error: false, message: "" });
  const [logOut, setLogOut] = useState(false);
  const [result, setResult] = useState({
    catches: [],
    date: { endDate: "", initDate: "", initHour: "", endHour: "" },
    localization: { coords: { lat: 0, lng: 0 }, text: "" },
    name: "",
    tackle: [],
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      if (sessionStorage.getItem("id") != null) {
        const aux = await getActivity(await isAuth());
        console.log(aux);
        setResult(aux);
        setReady(true);
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
            ActivityId: sessionStorage.getItem("id"),
          },
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      setError({ error: true, message: "Error, consulte al adrministrador" });
    }
  };

  return (
    <IonPage>
      {logOut && <Redirect to="/" push={true} exact={true} />}

      {ready && (
        <Fragment>
          <IonHeader className="header">
            <BackButton refer="/my/home" />
            <IonTitle className="tittle">Actividad</IonTitle>
          </IonHeader>
          <IonContent>
            <IonGrid className="grid-row">
              <IonRow className="row">
                <IonItemDivider className="itemDivider">
                  <IonItem>
                    <IonLabel className="label">Nombre </IonLabel>
                  </IonItem>
                </IonItemDivider>
              </IonRow>
              <IonRow className="row">
                <IonItemDivider className="itemDivider">
                  <IonLabel className="label">{result.name} </IonLabel>
                </IonItemDivider>
              </IonRow>
              <IonRow className="row">
                <IonItemDivider className="itemDivider">
                  <IonItem>
                    <IonLabel className="label">Equipo </IonLabel>
                  </IonItem>
                </IonItemDivider>
              </IonRow>
              {result.tackle.map((item) => {
                return (
                  <IonRow className="row">
                    <IonItemDivider className="itemDivider">
                      <IonLabel key={item} className="label">
                        {item}
                      </IonLabel>
                    </IonItemDivider>
                  </IonRow>
                );
              })}
              <IonRow className="row">
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonItem>
                      <IonLabel className="label time">Fecha Inicio </IonLabel>
                    </IonItem>
                  </IonItemDivider>
                </IonCol>
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonItem>
                      <IonLabel className="label time">Fecha Fin </IonLabel>
                    </IonItem>
                  </IonItemDivider>
                </IonCol>
              </IonRow>
              <IonRow className="row">
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonLabel className="label">
                      {result.date.initDate.slice(0, 10)}
                    </IonLabel>
                  </IonItemDivider>
                </IonCol>
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonLabel className="label">
                      {result.date.endDate.slice(0, 10)}
                    </IonLabel>
                  </IonItemDivider>
                </IonCol>
              </IonRow>
              <IonRow className="row">
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonItem>
                      <IonLabel className="label time">Hora Inicio</IonLabel>
                    </IonItem>
                  </IonItemDivider>
                </IonCol>
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonItem>
                      <IonLabel className="label time">Hora Fin </IonLabel>
                    </IonItem>
                  </IonItemDivider>
                </IonCol>
              </IonRow>
              <IonRow className="row">
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonLabel className="label">
                      {result.date.endDate.slice(11, 16)}
                    </IonLabel>
                  </IonItemDivider>
                </IonCol>
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonLabel className="label">
                      {result.date.initDate.slice(11, 16)}
                    </IonLabel>
                  </IonItemDivider>
                </IonCol>
              </IonRow>
              <IonRow className="row">
                <IonItemDivider className="itemDivider">
                  <IonItem>
                    <IonLabel className="label">Localización </IonLabel>
                  </IonItem>
                </IonItemDivider>
              </IonRow>
              <IonRow className="row">
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonLabel className="label">
                      Lat: {result.localization.coords.lat}
                    </IonLabel>
                  </IonItemDivider>
                </IonCol>
                <IonCol>
                  <IonItemDivider className="itemDivider">
                    <IonLabel className="label">
                      Lng: {result.localization.coords.lng}
                    </IonLabel>
                  </IonItemDivider>
                </IonCol>
              </IonRow>
            </IonGrid>
            <ShowMapComponent
              lat={result.localization.coords.lat}
              lng={result.localization.coords.lng}
            />
            {""}
            <IonGrid className="grid-row-two">
              {
                <IonRow className="localization-row">
                  <IonItemDivider className="itemDivider">
                    <IonText className="label  ion-text-wrap">
                      {result.localization.text}
                    </IonText>
                  </IonItemDivider>
                </IonRow>
              }
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
      )}
    </IonPage>
  );
}
