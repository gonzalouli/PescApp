import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
} from "@ionic/react";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import RefreshComponent from "../components/RefreshComponent";
import "../theme/NewActivityDate.css";

export default function NewActivityDate() {
  const [fechaInicio, setSelectedInitDate] = useState<string>(
    JSON.parse(window.sessionStorage.getItem("newActivity")).date.initDate || ""
  );
  const [fechaFin, setSelectedEndDate] = useState<string>(
    JSON.parse(window.sessionStorage.getItem("newActivity")).date.endDate || ""
  );
  const [horaInicio, setHoraInicio] = useState<string>(
    JSON.parse(window.sessionStorage.getItem("newActivity")).date.initHour || ""
  );
  const [horaFin, setHoraFin] = useState<string>(
    JSON.parse(window.sessionStorage.getItem("newActivity")).date.endHour || ""
  );
  const [state, setState] = useState<boolean>(false);

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/my/newActivity" />
        <IonTitle className="tittle">Nueva Fecha</IonTitle>
      </IonHeader>
      <IonContent>
        <RefreshComponent />
        <IonList className="dates">
          <IonItem>
            <IonLabel>Fecha inicio</IonLabel>
            <IonDatetime
              displayFormat="YYYY MM DD"
              value={fechaInicio}
              onIonChange={(e) => {
                setSelectedInitDate(e.detail.value!);
                const activityMod = JSON.parse(
                  window.sessionStorage.getItem("newActivity")
                );
                activityMod.date.initDate = e.detail.value;
                window.sessionStorage.setItem(
                  "newActivity",
                  JSON.stringify(activityMod)
                );
              }}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Fecha fin</IonLabel>
            <IonDatetime
              displayFormat="YYYY MM DD"
              value={fechaFin}
              onIonChange={(e) => {
                setSelectedEndDate(e.detail.value!);
                const activityMod = JSON.parse(
                  window.sessionStorage.getItem("newActivity")
                );
                activityMod.date.endDate = e.detail.value;
                window.sessionStorage.setItem(
                  "newActivity",
                  JSON.stringify(activityMod)
                );
              }}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Hora inicio</IonLabel>
            <IonDatetime
              displayFormat="HH:mm"
              value={horaInicio}
              onIonChange={(e) => {
                setHoraInicio(e.detail.value!);
                const activityMod = JSON.parse(
                  window.sessionStorage.getItem("newActivity")
                );
                activityMod.date.initHour = e.detail.value;
                window.sessionStorage.setItem(
                  "newActivity",
                  JSON.stringify(activityMod)
                );
              }}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Hora fin</IonLabel>
            <IonDatetime
              displayFormat="HH:mm"
              value={horaFin}
              onIonChange={(e) => {
                setHoraFin(e.detail.value!);
                const activityMod = JSON.parse(
                  window.sessionStorage.getItem("newActivity")
                );
                activityMod.date.endHour = e.detail.value;
                window.sessionStorage.setItem(
                  "newActivity",
                  JSON.stringify(activityMod)
                );
              }}
            ></IonDatetime>
          </IonItem>
          {state && <div className="error">Existe un error en las fechas</div>}
          <div className="submit buttons">
            <IonList className="submit buttons">
              <IonItem>
                <IonButton className="save" onClick={() => {}}>
                  Guardar
                </IonButton>
              </IonItem>
            </IonList>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
