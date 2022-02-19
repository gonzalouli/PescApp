import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
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
  const [success, setSuccess] = useState({ success: false, message: "" });
  const [toast, setToast] = useState(false);
  const [result, setResult] = useState([]);

  const [selectedActivity, setSelectedActivity] = useState(false);
  const [deletedActivity, setDeleteActivity] = useState(false);
  const [EditActivity, setEditActivity] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [present] = useIonAlert();

  useEffect(() => {
    getData();
    sessionStorage.removeItem("editActivity");
    // setShowLoading(false);
  }, [deletedActivity]);

  const getData = async () => {
    const aux = await getActivities(await isAuth());
    if (aux === null || aux?.length === 0) {
      setError(aux);
    } else setResult(aux);
  };

  const getToEdit = async (id) => {
    const aux = await getActivity(await isAuth(), id);
    setEditActivity(true);

    if (aux === null || aux?.length === 0) {
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
      setShowLoading(false);

      return res;
    } catch (error) {
      console.error(error);
      setError({ error: true, message: "Error consulte al administrador" });
      setShowLoading(false);
    }
    setShowLoading(false);
  };

  const chargeSessionStorage = async (res) => {
    sessionStorage.setItem("editActivity", JSON.stringify(res));
  };

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
      await chargeSessionStorage(res);
      return res;
    } catch (error) {
      console.error(error);
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

      const res = await API.del(
        "api9000aeb3",
        "/activities/deleteActivityWithId",
        {
          body: {
            CognitoUser: CognitoUser,
            ActivityId: id,
          },
        }
      );

      if (res.error === true) {
        setError(res);
        return;
      } else {
        setSuccess(res);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }

      setDeleteActivity(true);
    } catch (error) {}
  };

  return (
    <IonPage>
      {logOut && <Redirect to="/" push={true} exact={true} />}
      {selectedActivity && (
        <Redirect to="/my/MyActivityWithId" push={true} exact={true} />
      )}
      {/* {selectedActivity && (
        <Redirect to="/my/MyActivity" push={true} exact={true} />
      )} */}
      {EditActivity && (
        <Redirect to="/my/EditActivity" push={true} exact={true} />
      )}
      <Fragment>
        <IonHeader className="header">
          <BackButton refer="/my/home" />
          <IonTitle className="tittle">Mis Actividades</IonTitle>
        </IonHeader>
        <IonContent>
          <IonToast isOpen={toast} message="Actividad borrada" />
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Por favor, espere..."}
          />
          <IonGrid className="grid-row">
            <IonRow className="row">
              <IonItemDivider className="itemDivider">
                <IonCol className="topItem label ">Nombre</IonCol>
                <IonCol className="topItem label ">Fecha de creación</IonCol>
                <IonCol className="topItem label mode">Editar</IonCol>
                <IonCol className="topItem label mode">Borrar</IonCol>
              </IonItemDivider>
            </IonRow>
            {!error.error &&
              result.map((act) => {
                return (
                  <IonRow className="row">
                    <IonItemDivider className="itemDivider">
                      <IonCol
                        className="item ion-text-wrap"
                        onClick={() => {
                          handleShowActivity(act.Id);
                        }}
                      >
                        <IonLabel className="item ion-text-wrap">
                          {act.name}
                        </IonLabel>
                      </IonCol>
                      <IonCol
                        className="item "
                        onClick={() => {
                          handleShowActivity(act.Id);
                        }}
                      >
                        <div className="item">{act.createdAt.slice(0, 10)}</div>
                      </IonCol>
                      <IonCol className="button item mode">
                        <IonButton
                          fill="clear"
                          color="transparent"
                          onClick={() => {
                            sessionStorage.setItem("IdToEdit", act.Id);
                            getToEdit(act.Id);
                          }}
                        >
                          <UpdateSprite />
                        </IonButton>
                      </IonCol>
                      <IonCol className="buttonMuActivities item mode">
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
                                    setToast(true);
                                  },
                                },
                              ],

                              onDidDismiss: (e) => {},
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
