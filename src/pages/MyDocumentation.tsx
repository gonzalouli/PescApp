import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
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
  useIonAlert,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router";
import BackButton from "../components/BackButton";
import { API, Auth } from "aws-amplify";
import DeleteSprite from "../components/DeleteSprite";

export default function MyDocumentation() {
  const [result, setResult] = useState([]);
  const [logOut, setLogOut] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({ success: false, message: "" });
  const [present] = useIonAlert();
  const [toast, setToast] = useState(false);
  const [deletedDocumentation, setDeleteDocumentation] = useState(false);

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
      getData();
    } catch (error) {}
  }, []);

  const getData = async () => {
    try {
      const CognitoUser = await isAuth();

      const aux = await API.post("api9000aeb3", "/licenses/getLicense", {
        body: {
          CognitoUser: CognitoUser.username,
        },
      });

      if (aux.error) {
        setError(aux);
      } else setResult(aux);

      console.log(aux);
      setResult(aux);
      return aux;
    } catch (error) {
      setError({ error: true, message: "Error en el sistema" });
    }
  };

  const handleDeleteDocumentation = async (id) => {
    try {
    } catch (error) {}
  };

  return (
    <IonPage>
      {logOut && <Redirect to="/" push={true} exact={true} />}

      <IonHeader className="header">
        <BackButton refer="/my/Documentation" />
        <IonTitle className="tittle">Mi Documentacion</IonTitle>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {!success.success &&
            !error.error &&
            result.map((item) => {
              return (
                <Fragment>
                  <IonRow className="row">
                    <IonCol>
                      <IonItemDivider className="itemDivider">
                        <IonLabel className="label">{item?.name}</IonLabel>
                      </IonItemDivider>
                    </IonCol>
                  </IonRow>
                  <IonRow className="row">
                    <img alt={item.Id} src={item?.imageUrl} />
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItemDivider className="itemDivider">
                        <IonText className="ion-text-wrap description">
                          <IonLabel className="label">
                            {item?.description}
                          </IonLabel>
                        </IonText>
                      </IonItemDivider>
                    </IonCol>
                    <IonCol className="button item">
                      <IonButton
                        fill="clear"
                        color="transparent"
                        onClick={() => {
                          present({
                            cssClass: "my-css",
                            header: "¿Desea borrar esta documentación?",

                            buttons: [
                              { text: "Cancelar", handler: (d) => {} },
                              {
                                text: "Aceptar",
                                handler: (d) => {
                                  handleDeleteDocumentation(item.id);
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
                </Fragment>
              );
            })}
          {error.error === true && (
            <IonItem>
              <IonLabel className="error ion-text-wrap">
                {error.message}
              </IonLabel>
            </IonItem>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
