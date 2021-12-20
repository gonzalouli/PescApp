import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle } from '@ionic/react'
import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import RefreshComponent from '../components/RefreshComponent'
import '../theme/NewActivityTackle.css'

export default function NewActivityTackle() {

    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
  
    const addItem = event => {
      event.preventDefault();
      setItems([
        ...items,
        {
          id: items.length,
          name: itemName
        }
      ]);
      setItemName("");
    };

    return (
        <IonPage>
            <IonHeader className="header">
                 <BackButton refer="/my/newActivity" />
                 <IonTitle className='tittle' >Equipo utilizado</IonTitle>
            </IonHeader>
            <IonContent>
                <RefreshComponent/>
                <IonLabel className="labelNombre" >Nombre</IonLabel>
                <IonItem>
                    <form className="formTackle" onSubmit={addItem}>
                        <input className="addInput"
                            name="item"
                            type="text"
                            value={itemName}
                            onChange={e => setItemName(e.target.value)}
                        ></input>
                        <IonButton onClick={addItem} class="buttonAdd"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="9" />
                        <line x1="9" y1="12" x2="15" y2="12" />
                        <line x1="12" y1="9" x2="12" y2="15" />
                        </svg></IonButton>
                    </form>
                </IonItem>

                <IonContent className="selectedTackle">
                <IonLabel className="labelNombre" >Equipo introducido:</IonLabel>

                    {items.map(item => (
                    <li className='labelName' key={item.id}>{item.id+1}: {item.name}</li>
                    ))}
                <div className="submit buttons">
                    <IonList className="submit buttons">
                        <IonItem >
                            <IonButton className="save" routerLink="/my/newActivity">Guardar</IonButton>
                        </IonItem>
                    </IonList>
                </div>
                </IonContent>
            </IonContent>
        </IonPage>
    )
}
