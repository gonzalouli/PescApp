import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../theme/Login.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import { API } from "aws-amplify";

interface Props {
  onLogin: () => void;
}

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });
  const [isLog, setIsLog] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isForgotPass, setIsForgotPass] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const user: CognitoUser = await Auth.signIn(email, pass);
      setIsLog(true);
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, error: true });
    }
    setShowLoading(false);
  };
  //
  return (
    <IonPage>
      {isLog && <Redirect to="/my/home" push={true} exact={true} />}
      {isRegister && <Redirect to="/register" push={true} exact={true} />}
      {isForgotPass && <Redirect to="/forgotPass" push={true} exact={true} />}

      <IonHeader>
        <IonToolbar className="ion-align-items-center">
          <IonTitle className="tittle">PescApp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="form">
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Por favor, espere..."}
          duration={3000}
        />
        <IonList className="container">
          <IonItem className="item-container">
            <IonLabel className="label" position="stacked">
              Email
            </IonLabel>
            <IonInput
              className="text email"
              inputmode="email"
              value={email}
              placeholder="Email"
              onIonChange={(e) => setEmail(e.detail.value)}
            />
          </IonItem>
          <IonItem className="item-container">
            <IonLabel className="label" position="stacked">
              Contraseña
            </IonLabel>
            <IonInput
              className="text pass"
              type="password"
              value={pass}
              placeholder="Contraseña"
              minlength={6}
              maxlength={36}
              onIonChange={(e) => setPass(e.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error && (
          <div className="error">Error en el inicio de sesion</div>
        )}
        <IonButton
          className="entrar"
          type="submit"
          expand="block"
          onClick={() => {
            setShowLoading(true);
            handleLogin();
          }}
        >
          Entrar
        </IonButton>

        <IonLoading isOpen={status.loading}></IonLoading>
        <IonList className="links">
          <IonItem>
            <IonButton
              className="button"
              color="light"
              onClick={() => setIsForgotPass(true)}
            >
              ¿Olvidaste la contraseña?
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton
              className="button"
              color="light"
              onClick={() => setIsRegister(true)}
            >
              Registrate aqui
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
