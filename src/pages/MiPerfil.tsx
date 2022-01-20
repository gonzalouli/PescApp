import {
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import BackButton from "../components/BackButton";
import "../theme/Header.css";
import "../theme/MiPerfil.css";
import { Auth } from "aws-amplify";

const MiPerfil: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [changePass, setChangePass] = useState<boolean>(false);
  const [verifiedmsg, setVerifiedmsg] = useState(false);
  const [changed, setChanged] = useState(false);

  const [status, setStatus] = useState({
    error: false,
    msg: "",
  });
  useEffect(() => {
    !changed &&
      Auth.currentAuthenticatedUser().then((data) => {
        console.log(data);
        setName(
          data.attributes["custom:name"].replace(/\b\w/g, function (l) {
            return l.toUpperCase();
          })
        );
        setSurname(
          data.attributes["custom:surname"].replace(/\b\w/g, function (l) {
            return l.toUpperCase();
          })
        );
        setEmail(data.attributes["email"]);
      });
  });

  const handleChangeData = async () => {
    try {
      await Auth.currentAuthenticatedUser()
        .then(async (user) => {
          await Auth.updateUserAttributes(user, {
            "custom:name": name,
            "custom:surname": surname,
          }).then(() => {
            setVerifiedmsg(true);
          });
        })
        .catch(() => {
          setStatus({
            error: true,
            msg: "No se pudo cambiar los datos, intentelo mas tarde...",
          });
        });
    } catch (error) {}
  };

  return (
    <IonPage>
      {changePass && <Redirect to="/my/changePass" push={true} exact={true} />}
      <IonHeader className="header">
        <BackButton refer="/my/home" />
        <IonTitle className="tittle">Mi Perfil</IonTitle>
      </IonHeader>
      <IonContent>
        {/* <IonList className="container">
          <IonItem>IMAGEN</IonItem>
        </IonList> */}
        <IonList className="container">
          <IonItem className="formItem ">
            <IonLabel className="label" position="stacked">
              Nombre
            </IonLabel>
            <IonInput
              className="text"
              type="text"
              value={name}
              onIonChange={(e) => {
                setChanged(true);
                setName(e.detail.value);
              }}
            />
          </IonItem>
          <IonItem className="formItem">
            <IonLabel className="label" position="stacked">
              Apellidos
            </IonLabel>
            <IonInput
              className="text"
              type="text"
              value={surname}
              onIonChange={(e) => {
                setChanged(true);
                setSurname(e.detail.value);
              }}
            />
          </IonItem>
          <IonItem className="formItem">
            <IonLabel className="label" position="floating">
              Email
            </IonLabel>
            <IonLabel
              className="label mail"
              placeholder={email}
              position="stacked"
            >
              {email}
            </IonLabel>
          </IonItem>
        </IonList>
        <div className="buttons">
          <IonButton
            className="save ion-text-wrap"
            onClick={() => {
              setChangePass(true);
            }}
          >
            Cambiar contraseña
          </IonButton>
        </div>
        <div className="buttons">
          <IonButton className="save" onClick={handleChangeData}>
            Guardar
          </IonButton>
        </div>
        {status.error && (
          <IonItem className="codeMsg">
            <IonLabel className="ion-text-wrap" color="danger">
              {status.msg}
            </IonLabel>
          </IonItem>
        )}
        {verifiedmsg && (
          <IonItem className="codeMsg">
            <IonLabel color="primary">Datos establecidos</IonLabel>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MiPerfil;
