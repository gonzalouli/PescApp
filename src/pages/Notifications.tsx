import { transferKeyToUpperCase } from "@aws-amplify/core";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  isPlatform,
  useIonAlert,
} from "@ionic/react";
import { API, Auth } from "aws-amplify";
import { trimEnd } from "cypress/types/lodash";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import BackButton from "../components/BackButton";
import DeleteSprite from "../components/DeleteSprite";
import "../theme/Notifications.css";

export default function Notifications() {
  const [logOut, setLogOut] = useState(false);
  const [status, setStatus] = useState({ error: false, message: "" });

  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({ success: false, message: "" });
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(0);
  const [selectedTide, setSelectedTide] = useState("");
  const [selectedHeightTide, setSelectedHeightTide] = useState(0);
  const [selectedWind, setSelectedWind] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(false);
  const [present] = useIonAlert();
  const [movile, setMovile] = useState(false);
  const [loading, setLoading] = useState(true);

  const [deletedNotification, setDeleteNotification] = useState(false);
  const [insertedNotification, setInsertedNotification] = useState(false);

  async function fetchNotifications() {
    const CognitoUser = await isAuth();

    const res = await API.post(
      "api9000aeb3",
      "/notifications/getNotifications",
      {
        body: {
          CongnitoUser: CognitoUser.username,
        },
      }
    );
    if (res.error === true) setError(res);
    else {
      if (res.length == 0) {
        setNotifications([]);
        setError({
          error: true,
          message: "No tiene aun ninguna notificación",
        });
      } else setNotifications(res);
    }
  }

  useEffect(() => {
    if (isPlatform("android") || isPlatform("ios")) {
      setMovile(true);
    }
    setDeleteNotification(false);
    setInsertedNotification(false);
    async function fetchApi() {
      setPorts(await API.get("api9000aeb3", "/ports/getPorts", {}));
    }
    async function fetchNotifications() {
      const CognitoUser = await isAuth();

      const res = await API.post(
        "api9000aeb3",
        "/notifications/getNotifications",
        {
          body: {
            CongnitoUser: CognitoUser.username,
          },
        }
      );
      if (res.error === true) setError(res);
      else {
        if (res.length == 0)
          setError({
            error: true,
            message: "No tiene aun ninguna notificación",
          });
        else setNotifications(res);
      }
    }
    fetchApi();
    fetchNotifications();
    setLoading(false);
  }, [deletedNotification, insertedNotification]);

  const isAuth = async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      setLogOut(true);
      console.error("Ususario no loggeado: " + error.message);
      await Auth.signOut();
      return null;
    }
  };

  const sendNotificationToDatabase = async () => {
    if (selectedPort === 0 || selectedTide === "") {
      setStatus({ error: true, message: "Complete todos los campos" });
    } else {
      try {
        const CognitoUser = await isAuth();
        const rest = await API.post(
          "api9000aeb3",
          "/notifications/setNotifications",
          {
            body: {
              CognitoUser,
              selectedPort,
              selectedTide,
              selectedHeightTide,
              selectedWind,
              NotificationToken: window.localStorage.getItem("pushToken"),
            },
          }
        );
        if (rest.error == true) {
          setError(rest);
        } else {
          setSuccess(rest);
        }
        setTimeout(() => {
          setSuccess({ success: false, message: "" });
        }, 2000);
        setInsertedNotification(true);
      } catch (e) {
        setError({
          error: true,
          message: "Error en el sistema, intentelo mas tarde",
        });
      }
    }

    setTimeout(() => {
      setStatus({ error: false, message: "" });
    }, 2000);
  };

  const handleDeleteNotification = async (notification) => {
    try {
      const CognitoUser = await isAuth();

      const result = await API.del(
        "api9000aeb3",
        "/notifications/deleteNotifications",
        {
          body: {
            CognitoUser: CognitoUser.username,
            notification,
          },
        }
      );

      if (result.success == true) setSuccess(result);
      else setError(result);

      setTimeout(() => {
        setSuccess({ success: false, message: "" });
      }, 3000);
      setDeleteNotification(true);
    } catch (error) {
      setError({
        error: true,
        message: "Error en el sistema, intentelo mas tarde",
      });
    }
    await fetchNotifications();
  };

  return (
    <IonPage>
      {logOut && <Redirect to="/" push={true} exact={true} />}

      <IonHeader className="header">
        <BackButton refer="/my/home" />
        <IonTitle className="tittle">Notificaciones</IonTitle>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={loading}></IonLoading>
        {!movile && (
          <IonItem>
            <IonText color="danger" className="label ion-text-center">
              NO DISPONIBLE EN VERSIÓN WEB
            </IonText>
          </IonItem>
        )}

        {movile && (
          <IonList>
            <IonItem className="selectItem">
              <IonLabel className="label" position="stacked">
                Puerto
              </IonLabel>
              <IonSelect
                interface="action-sheet"
                okText="Aceptar"
                cancelText="Cancelar"
                onIonChange={(e) => {
                  setSelectedPort(e.detail.value);
                }}
              >
                {ports.map((e) => {
                  return (
                    <IonSelectOption
                      className="options ion-text-wrap label"
                      value={e.id}
                      key={e.id}
                    >
                      <IonLabel className="ion-text-wrap">
                        {e.description}
                      </IonLabel>
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
            <IonItem className="selectItem">
              <IonLabel className="label" position="stacked">
                Marea
              </IonLabel>
              <IonSelect
                interface="action-sheet"
                okText="Aceptar"
                cancelText="Cancelar"
                onIonChange={(e) => setSelectedTide(e.detail.value)}
              >
                <IonSelectOption
                  className="options ion-text-wrap label"
                  value="Bajamar"
                >
                  <IonLabel className="label">Bajamar</IonLabel>
                </IonSelectOption>
                <IonSelectOption
                  className="options ion-text-wrap label"
                  value="Pleamar"
                >
                  <IonLabel className="label">Pleamar</IonLabel>
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem className="inputelement">
              <IonLabel className="label alturaMarea">Altura de marea</IonLabel>
              <IonInput
                className="label input"
                inputmode="decimal"
                min="0"
                placeholder="0"
                type="number"
                onIonChange={(e) =>
                  setSelectedHeightTide(Number(e.detail.value))
                }
              ></IonInput>
            </IonItem>
            <IonItem className="inputelement">
              <IonLabel className="label alturaMarea ion-text-wrap">
                Velocidad del viento (nudos)
              </IonLabel>
              <IonInput
                className="label input"
                inputmode="decimal"
                min="0"
                placeholder="0"
                type="number"
                onIonChange={(e) => setSelectedWind(Number(e.detail.value))}
              ></IonInput>
            </IonItem>

            {status.error && <div className="error">{status.message}</div>}

            <IonButton
              className="label button"
              onClick={sendNotificationToDatabase}
            >
              Enviar
            </IonButton>
          </IonList>
        )}
        <IonItem>
          <IonLabel className="label aviso">Mis notificaciones</IonLabel>
        </IonItem>
        {notifications?.length !== 0 && (
          <IonItem>
            <IonGrid className="grid">
              <IonRow>
                <IonCol className="head ion-text-wrap buttonCol">Puerto</IonCol>
                <IonCol className="head ion-text-wrap buttonCol">Tipo</IonCol>
                <IonCol className="head ion-text-wrap buttonCol">
                  Altura Marea
                </IonCol>
                <IonCol className="head ion-text-wrap buttonCol">Viento</IonCol>
                <IonCol className="head ion-text-wrap buttonCol"></IonCol>
              </IonRow>
              {notifications.map((n) => {
                return (
                  <IonRow key={n.id} className="notif">
                    <IonCol key={n.id + 1} className="buttonCol ion-text-wrap">
                      {n.portName}
                    </IonCol>
                    <IonCol key={n.id + 2} className="buttonCol ion-text-wrap">
                      {n.tipoMarea.slice(0, 1)}
                    </IonCol>
                    <IonCol key={n.id + 3} className="buttonCol ion-text-wrap">
                      {n.alturaMarea}
                    </IonCol>
                    <IonCol key={n.id + 4} className="buttonCol ion-text-wrap">
                      {n.viento}
                    </IonCol>
                    <IonCol key={n.id + 5} className="buttonCol ion-text-wrap">
                      <IonButton
                        className="deleteSprite"
                        fill="clear"
                        color="transparent"
                        onClick={() => {
                          present({
                            cssClass: "my-css",
                            header: "¿Desea borrar esta notificación?",

                            buttons: [
                              { text: "Cancelar", handler: (d) => {} },
                              {
                                text: "Aceptar",
                                handler: async (d) => {
                                  await handleDeleteNotification(n);
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
                  </IonRow>
                );
              })}
            </IonGrid>
          </IonItem>
        )}
        {notifications.length === 0 && error.error && (
          <div className="error">{error.message}</div>
        )}
        {success.success && (
          <IonLabel
            position="fixed"
            className="label ion-text-center success"
            color="primary"
          >
            {success.message}
          </IonLabel>
        )}
      </IonContent>
    </IonPage>
  );
}
