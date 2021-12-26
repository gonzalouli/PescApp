import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRouterLink, IonText, IonTitle, IonToolbar } from '@ionic/react';
import '../theme/Login.css';
import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

interface Props{
  onLogin: ()=>void;
}

const Home: React.FC = () => {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('');
  const [status, setStatus] = useState({loading: false, error: true});
  
  const handleLogin = async ()=>{
    setStatus({loading: true, error:false})

    try {

      const req = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_HOST,
        headers:{'Access-Control-Allow-Origin': '*'} 
      });

      await req.post('/fire/auth',{
        email: email,
        pass: pass
      })      

      setStatus({loading: false, error:false})
    } catch (error) {
      setStatus({loading: false, error:true})
    }
    console.log('golla')
    return <Redirect to="/home"/>
  }
 
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-align-items-center">
          <IonTitle className="tittle" >PescApp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="form">
        <IonList className="container" >
          <IonItem>
            <IonLabel className="label" position="stacked">Email</IonLabel>
            <IonInput className="text email" inputmode="email" value={email}  placeholder="Email"
            onIonChange={e=>setEmail(e.detail.value)}/>            
          </IonItem>
          <IonItem>
            <IonLabel className="label" position="stacked">Contraseña</IonLabel>
            <IonInput className="text pass" type="password" value={pass} placeholder="Contraseña"
            minlength={6} maxlength={36} onIonChange={e=>setPass(e.detail.value)}/>            
          </IonItem>
        </IonList>
        {status.error &&
        <div className="error">Error en el inicio de sesion</div>
        }
        <IonButton className="entrar" type="submit" expand="block" onClick={handleLogin} >Entrar</IonButton>
        
        <IonLoading isOpen={status.loading}></IonLoading>
        <div className="links">
          <IonItem>
            <IonRouterLink color="primary" href="/forgotPass">Olvidaste la contraseña?</IonRouterLink>
          </IonItem>
          <IonItem >
            <IonRouterLink color="primary" href="/register">Registrate aqui</IonRouterLink>
          </IonItem>
        </div>

        

      </IonContent>
    </IonPage>
  );
};

export default Home;
