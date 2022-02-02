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
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import BackButton from "../components/BackButton";
import RefreshComponent from "../components/RefreshComponent";
import "../theme/NewActivityDate.css";
import { ResetLS } from "../utils/ResetLocalStorage";

export default function EditActivityDate() {
  useEffect(() => {}, []);

  const [fechaInicio, setSelectedInitDate] = useState<string>(
    JSON.parse(window.sessionStorage.getItem("editActivity")).date.initDate ||
      ""
  );
  const [fechaFin, setSelectedEndDate] = useState<string>(
    JSON.parse(window.sessionStorage.getItem("editActivity")).date.endDate || ""
  );
  const [horaInicio, setHoraInicio] = useState<string>(
    JSON.parse(window.sessionStorage.getItem("editActivity")).date.initHour ||
      ""
  );
  const [horaFin, setHoraFin] = useState<string>(
    JSON.parse(window.sessionStorage.getItem("editActivity")).date.endHour || ""
  );
  const [state, setState] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/my/EditActivity" />
        <IonTitle className="tittle">Nueva Fecha</IonTitle>
      </IonHeader>
      <IonContent>
        {/* <RefreshComponent /> */}
        <IonList className="form-content">
          <IonItem>
            <IonLabel>Fecha inicio</IonLabel>
            <IonDatetime
              className="fechaIni"
              displayFormat="YYYY MM DD"
              value={fechaInicio}
              onIonChange={(e) => {
                setSelectedInitDate(e.detail.value!);
                const activityMod = JSON.parse(
                  window.sessionStorage.getItem("editActivity")
                );
                activityMod.date.initDate = e.detail.value;
                window.sessionStorage.setItem(
                  "editActivity",
                  JSON.stringify(activityMod)
                );
              }}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Fecha fin</IonLabel>
            <IonDatetime
              className="fechaFin"
              displayFormat="YYYY MM DD"
              value={fechaFin}
              onIonChange={(e) => {
                setSelectedEndDate(e.detail.value!);
                const activityMod = JSON.parse(
                  window.sessionStorage.getItem("editActivity")
                );
                activityMod.date.endDate = e.detail.value;
                window.sessionStorage.setItem(
                  "editActivity",
                  JSON.stringify(activityMod)
                );
              }}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Hora inicio</IonLabel>
            <IonDatetime
              className="horaIni"
              displayFormat="HH:mm"
              value={horaInicio}
              onIonChange={(e) => {
                setHoraInicio(e.detail.value!);
                const activityMod = JSON.parse(
                  window.sessionStorage.getItem("editActivity")
                );
                activityMod.date.initHour = e.detail.value;
                window.sessionStorage.setItem(
                  "editActivity",
                  JSON.stringify(activityMod)
                );
              }}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Hora fin</IonLabel>
            <IonDatetime
              className="horaFin"
              displayFormat="HH:mm"
              value={horaFin}
              onIonChange={(e) => {
                setHoraFin(e.detail.value!);
                const activityMod = JSON.parse(
                  window.sessionStorage.getItem("editActivity")
                );
                activityMod.date.endHour = e.detail.value;
                window.sessionStorage.setItem(
                  "editActivity",
                  JSON.stringify(activityMod)
                );
              }}
            ></IonDatetime>
          </IonItem>
          {state && <div className="error">Existe un error en las fechas</div>}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
