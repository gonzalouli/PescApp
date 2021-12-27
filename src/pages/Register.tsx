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
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import "../theme/Register.css";
export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [newpass, setNewPass] = useState("");
  const [repeatpass, setRepeatPass] = useState("");
  const [shownNew, setShownNew] = useState(false);
  const [shownRepeat, setShownRepeat] = useState(false);

  const [status, setStatus] = useState({ loading: false, error: true });

  const switchShownNew = () => setShownNew(!shownNew);
  const switchShownRepeat = () => setShownRepeat(!shownRepeat);

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/login" />
        <IonTitle className="tittle">Nuevo usuario</IonTitle>
      </IonHeader>
      <IonContent>
        <IonGrid className="grid-fixed">
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel className="label" position="stacked">
                  Nombre
                </IonLabel>
                <IonInput
                  className="text"
                  type="text"
                  value={name}
                  onIonChange={(e) => setName(e.detail.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel className="label" position="stacked">
                  Apellidos
                </IonLabel>
                <IonInput
                  className="text"
                  type="text"
                  value={surname}
                  onIonChange={(e) => setSurname(e.detail.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel className="label" position="stacked">
                  Email de registro
                </IonLabel>
                <IonInput
                  className="text"
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel className="label" position="stacked">
                  Contraseña
                </IonLabel>
                <IonInput
                  className="text"
                  type={shownNew ? "text" : "password"}
                  value={newpass}
                  onIonChange={(e) => setNewPass(e.detail.value)}
                />
              </IonItem>
            </IonCol>
            <button className="eyebutton" onClick={switchShownNew}>
              {shownNew ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye-check"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00abfb"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 19c-4 0 -7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7c-.42 .736 -.858 1.414 -1.311 2.033" />
                  <path d="M15 19l2 2l4 -4" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye-off"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00abfb"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                  <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                  <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                </svg>
              )}
            </button>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel className="label" position="stacked">
                  Repetir contraseña
                </IonLabel>
                <IonInput
                  className="text"
                  type={shownRepeat ? "text" : "password"}
                  value={repeatpass}
                  onIonChange={(e) => setRepeatPass(e.detail.value)}
                />
              </IonItem>
            </IonCol>
            <button className="eyebutton" onClick={switchShownRepeat}>
              {switchShownRepeat ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye-off"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00abfb"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                  <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                  <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye-check"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00abfb"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 19c-4 0 -7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7c-.42 .736 -.858 1.414 -1.311 2.033" />
                  <path d="M15 19l2 2l4 -4" />
                </svg>
              )}
            </button>
          </IonRow>
          {status.error && (
            <div className="error">
              Error en el registro, compruebe sus datos
            </div>
          )}
        </IonGrid>
        <div className="submit buttons">
          <IonList className="submit buttons">
            <IonItem>
              <IonButton className="save" onClick={() => {}}>
                Registrarse
              </IonButton>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
