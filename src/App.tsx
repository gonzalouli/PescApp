import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Pages to route
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';
import Home from './pages/Home';
import ChangePass from './pages/ChangePass'
import NewActivity from './pages/NewActivity'
import Register from './pages/Register';
import NewActivityDate from './pages/NewActivityDate';
import NewActivityTackle from './pages/NewActivityTackle';
import MiPerfil from './pages/MiPerfil';
import ResetPass from './pages/ResetPass';
import NewActivityLocalization from './pages/NewActivityLocalization'
import Meteorology from './pages/Meteorology';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import NewActivityCatch from './pages/NewActivityCatch';
import Documentation from './pages/Documentation';
import NewDocumentation from './pages/NewDocumentation';
import MyDocumentation from './pages/MyDocumentation';


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/my/home">
            <Home/>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/my/profile">
          <MiPerfil />
        </Route>
        <Route exact path="/my/changePass">
          <ChangePass />
        </Route>
        <Route exact path="/my/NewActivity">
          <NewActivity />
        </Route>
        <Route exact path="/my/NewActivity/Date">
          <NewActivityDate />
        </Route>
        <Route exact path="/my/NewActivity/Tackle">
          <NewActivityTackle/>
        </Route>
        <Route exact path="/my/NewActivity/Localization">
            <NewActivityLocalization/>
        </Route>
        <Route exact path="/my/NewActivity/Catch">
            <NewActivityCatch/>
        </Route>
        <Route exact path="/my/Meteorology">
            <Meteorology/>
        </Route>
        <Route exact path="/my/Documentation">
            <Documentation/>
        </Route>
        <Route exact path="/my/Documentation/NewDocumentation">
            <NewDocumentation/>
        </Route>
        <Route exact path="/my/Documentation/MyDocumentation">
            <MyDocumentation/>
        </Route>
        <Route exact path="/forgotPass">
            <ResetPass/>
        </Route>
        <Route exact path="/register">
            <Register/>
        </Route>
        <Redirect exact path="/" to="/login"/>
      
        <Route>
          <NotFoundPage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
