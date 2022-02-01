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
  useIonAlert,
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
  const [dataEmpty, setDataEmpty] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState(false);
  const [deletedActivity, setDeleteActivity] = useState(false);

  const [present] = useIonAlert();

  useEffect(() => {
    getData();
  }, [deletedActivity]);

  const getData = async () => {
    const aux = await getActivities(await isAuth());
    if (aux == null || aux.length == 0 || aux == undefined) {
      setError(aux);
    } else setResult(aux);
  };

  const isAuth = async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      setLogOut(true);
      console.error("Ususario no loggeado: " + error.message);
      return null;
    }
  };

  const getActivities = async (CognitoUser) => {
    try {
      const res = await API.post(
        "api9000aeb3",
        "/activities/getAllActivities",
        {
          body: {
            CognitoUser: CognitoUser,
          },
        }
      );
      if (res.error) {
        setError(res);
      }

      return res;
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

  const handleDeleteActivity = async (id) => {
    try {
      const CognitoUser = await isAuth();

      const result = await API.del(
        "api9000aeb3",
        "/activities/deleteActivityWithId",
        {
          body: {
            CognitoUser: CognitoUser,
            ActivityId: id,
          },
        }
      );
      setDeleteActivity(true);
    } catch (error) {}
  };

  return (
    <IonPage>
      {logOut && <Redirect to="/" push={true} exact={true} />}
      {selectedActivity && (
        <Redirect to="/my/MyActivityWithId" push={true} exact={true} />
      )}
      {selectedActivity && (
        <Redirect to="/my/MyActivity" push={true} exact={true} />
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
            {!error.error &&
              result.map((act) => {
                return (
                  <IonRow className="row">
                    <IonItemDivider className="itemDivider">
                      <IonCol
                        className="item"
                        onClick={() => {
                          handleShowActivity(act.Id);
                        }}
                      >
                        <div className="item">{act.name}</div>
                      </IonCol>
                      <IonCol
                        className="item "
                        onClick={() => {
                          handleShowActivity(act.Id);
                        }}
                      >
                        <div className="item">{act.createdAt.slice(0, 10)}</div>
                      </IonCol>
                      <IonCol className="button item">
                        <IonButton fill="clear" color="transparent">
                          <UpdateSprite />
                        </IonButton>
                      </IonCol>
                      <IonCol className="button item">
                        <IonButton
                          fill="clear"
                          color="transparent"
                          onClick={() => {
                            present({
                              cssClass: "my-css",
                              header: "¿Desea borrar esta actividad?",

                              buttons: [
                                { text: "Cancelar", handler: (d) => {} },
                                {
                                  text: "Aceptar",
                                  handler: (d) => {
                                    handleDeleteActivity(act.Id);
                                  },
                                },
                              ],

                              onDidDismiss: (e) => console.log("did dismiss"),
                            });
                          }}
                        >
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
