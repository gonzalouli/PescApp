import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRouterLink, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
import firebaseui from 'firebaseui'
import axios from 'axios';
import { useState } from 'react';

interface Props{
  onLogin: ()=>void;
}

const Home: React.FC = () => {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('');
  const [status, setStatus] = useState({loading: false, error: true});
  
  const handleLogin = async ()=>{
    setStatus({loading: true, error:false})
    //mandar a backend contrasenia y email
    try {

      const req = axios.create({
        baseURL: "http://localhost:4444"
        ,
        headers:{'Access-Control-Allow-Origin': '*'} 
      });

      await req.post('/auth',{
        email: email,
        pass: pass
      })

      await req.get('/hola')
      

      setStatus({loading: false, error:false})
    } catch (error) {
      setStatus({loading: false, error:true})

    }
  }
 
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-align-items-center">
          <IonTitle >PescApp login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding form">
        <IonList >
          <IonItem>
            <IonLabel className="label" position="stacked">Email</IonLabel>
            <IonInput className="text" type="email" value={email}  placeholder="Email"
            onIonChange={e=>setEmail(e.detail.value)}/>            
          </IonItem>
          <IonItem>
            <IonLabel className="label" position="stacked">Contraseña</IonLabel>
            <IonInput className="text" type="password" value={pass} placeholder="Contraseña"
            minlength={6} maxlength={36} onIonChange={e=>setPass(e.detail.value)}/>            
          </IonItem>
        </IonList>
        {status.error &&
        <div className="error">Error en el inicio de sesion</div>
        }
        <IonButton className="entrar" expand="block" onClick={handleLogin}>Entrar</IonButton>
        <IonLoading isOpen={status.loading}></IonLoading>
        <IonItem className="links" >
          <IonRouterLink color="primary" href="/forgotPass">Olvidaste la contraseña?</IonRouterLink>
        </IonItem>
        <IonItem className="links" >
          <IonRouterLink color="primary" href="/register">Registrate aqui</IonRouterLink>
        </IonItem>
        

      </IonContent>
    </IonPage>
  );
};

export default Home;
