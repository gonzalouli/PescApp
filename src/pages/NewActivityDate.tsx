import { IonButton, IonContent, IonDatetime, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle } from '@ionic/react'
import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import RefreshComponent from '../components/RefreshComponent';

export default function NewActivityDate() {
    const [fechaInicio, setSelectedInitDate] = useState<string>('');
    const [fechaFin, setSelectedEndDate] = useState<string>(fechaInicio);
    const [horaInicio, setHoraInicio] = useState<string>('');
    const [horaFin, setHoraFin] = useState<string>('');
    const [state, setState] = useState<boolean>(true)

    return (
        <IonPage>
        <IonHeader className="header">
                <BackButton refer="/my/newActivity" />
                <IonTitle className='tittle'>Nueva Fecha</IonTitle>
        </IonHeader>
        <IonContent>
            <RefreshComponent/>
            <IonList className="dates">
                <IonItem>
                    <IonLabel>Fecha inicio</IonLabel>
                    <IonDatetime
                        displayFormat="DDDD MMM D, YYYY"
                        value={fechaInicio}
                        onIonChange={(e) => setSelectedInitDate(e.detail.value!)}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel>Fecha fin</IonLabel>
                    <IonDatetime
                        displayFormat="DDDD MMM D, YYYY"
                        value={fechaFin}
                        onIonChange={(e) => setSelectedEndDate(e.detail.value!)}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel>Hora inicio</IonLabel>
                    <IonDatetime
                        displayFormat="HH"
                        value={horaInicio}
                        onIonChange={(e) => setHoraInicio(e.detail.value!)}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel>Hora fin</IonLabel>
                    <IonDatetime
                        displayFormat="HH"
                        value={horaFin}
                        onIonChange={(e) => setHoraFin(e.detail.value!)}
                    ></IonDatetime>
            </IonItem>
            {state &&
                <div className="error">Existe un error en las fechas</div>
            }
            <div className="submit buttons">
                    <IonList className="submit buttons">
                        <IonItem >
                            <IonButton className="save" onClick={()=>{}}>Guardar</IonButton>
                        </IonItem>
                    </IonList>
                </div>
        </IonList>
        </IonContent>
        </IonPage>
    )
}
