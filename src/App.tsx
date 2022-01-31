import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

// Pages to route
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ChangePass from "./pages/ChangePass";
import NewActivity from "./pages/NewActivity";
import Register from "./pages/Register";
import NewActivityDate from "./pages/NewActivityDate";
import NewActivityTackle from "./pages/NewActivityTackle";
import MiPerfil from "./pages/MiPerfil";
import ResetPass from "./pages/ResetPass";
import NewActivityLocalization from "./pages/NewActivityLocalization";
import Meteorology from "./pages/Meteorology";
import MeteorologyOrTide from "./pages/MereorologyOrTide";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import NewActivityCatch from "./pages/NewActivityCatch";
import Documentation from "./pages/Documentation";
import NewDocumentation from "./pages/NewDocumentation";
import MyDocumentation from "./pages/MyDocumentation";
import { Auth } from "aws-amplify";
import { Fragment, useEffect, useState } from "react";
import Tide from "./pages/Tide";
import MyActivity from "./pages/MyActivity";
import MyActivityWithId from "./pages/MyActivityWithId";

const App: React.FC = () => {
  const [isLog, setIsLog] = useState(false);

  const checkauth = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsLog(true);
    } catch (error) {
      setIsLog(false);
    }
  };
  const isLogged = async () => {
    await checkauth();
    return isLog;
  };

  useEffect(() => {
    checkauth();
    setInterval(checkauth, 7200000);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route exact={true} path="/login">
            <Login />
          </Route>
          <Route exact={true} path="/forgotPass">
            <ResetPass />
          </Route>
          <Route exact={true} path="/register">
            <Register />
          </Route>
          <Redirect exact={true} path="/" to="/login" />

          {isLogged && (
            <Fragment>
              <Route exact={true} path="/my/home">
                <Home />
              </Route>
              <Route exact={true} path="/my/profile">
                <MiPerfil />
              </Route>
              <Route exact={true} path="/my/changePass">
                <ChangePass />
              </Route>
              <Route exact={true} path="/my/NewActivity">
                <NewActivity />
              </Route>
              <Route exact={true} path="/my/MyActivity">
                <MyActivity />
              </Route>
              <Route exact={true} path="/my/MyActivityWithId">
                <MyActivityWithId />
              </Route>
              <Route exact={true} path="/my/NewActivity/Date">
                <NewActivityDate />
              </Route>
              <Route exact={true} path="/my/NewActivity/Tackle">
                <NewActivityTackle />
              </Route>
              <Route exact={true} path="/my/NewActivity/Localization">
                <NewActivityLocalization />
              </Route>
              <Route exact={true} path="/my/NewActivity/Catch">
                <NewActivityCatch />
              </Route>
              <Route exact={true} path="/my/Meteorology">
                <Meteorology />
              </Route>
              <Route exact={true} path="/my/Tide">
                <Tide />
              </Route>
              <Route exact={true} path="/my/MeteorologyOrTide">
                <MeteorologyOrTide />
              </Route>
              <Route exact={true} path="/my/Documentation">
                <Documentation />
              </Route>
              <Route exact={true} path="/my/Documentation/NewDocumentation">
                <NewDocumentation />
              </Route>
              <Route exact={true} path="/my/Documentation/MyDocumentation">
                <MyDocumentation />
              </Route>
            </Fragment>
          )}
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
