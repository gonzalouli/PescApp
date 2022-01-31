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
import "../theme/MyActivities.css";
import UpdateSprite from "../components/UpdateSprite";
import DeleteSprite from "../components/DeleteSprite";

export default function MyActivity() {
  const [logOut, setLogOut] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [result, setResult] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const aux = await getActivities(await isAuth());
    if (aux == null || aux.length == 0) setError(aux);
    else setResult(aux);
  };

  const isAuth = async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      setLogOut(true);
      console.error("Ususario no loggeado: " + error.message);
    }
  };

  const getActivities = async (CognitoUser) => {
    try {
      const result = await API.post(
        "api9000aeb3",
        "/activities/getAllActivities",
        {
          body: {
            CognitoUser: CognitoUser,
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

  const setActivityIdToSession = async (id) => {
    sessionStorage.setItem("id", id);
  };

  const handleShowActivity = async (activity) => {
    console.log(activity);
    await setActivityIdToSession(activity);
    setSelectedActivity(true);
  };

  return (
    <IonPage>
      {logOut && <Redirect to="/" push={true} exact={true} />}
      {selectedActivity && (
        <Redirect to="/my/MyActivityWithId" push={true} exact={true} />
      )}
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
            {result.map((act) => {
              return (
                <IonRow
                  className="row"
                  onClick={() => {
                    handleShowActivity(act.Id);
                  }}
                >
                  <IonItemDivider className="itemDivider">
                    <IonCol className="item  ">
                      <div className="item">{act.name}</div>
                    </IonCol>
                    <IonCol className="item ">
                      <div className="item">{act.createdAt.slice(0, 10)}</div>
                    </IonCol>
                    <IonCol className="button item">
                      <IonButton fill="clear" color="transparent">
                        <UpdateSprite />
                      </IonButton>
                    </IonCol>
                    <IonCol className="button item">
                      <IonButton fill="clear" color="transparent">
                        <DeleteSprite />
                      </IonButton>
                    </IonCol>
                  </IonItemDivider>
                </IonRow>
              );
            })}
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
