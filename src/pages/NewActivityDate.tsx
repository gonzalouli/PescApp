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

export default function NewActivityDate() {
  useEffect(() => {
    ResetLS();
  }, []);

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
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <IonPage>
      {isConfirmed && (
        <Redirect to="/my/NewActivity" push={true} exact={true} />
      )}
      <IonHeader className="header">
        <BackButton refer="/my/newActivity" />
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
              className="fechaFin"
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
              className="horaIni"
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
              className="horaFin"
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
        </IonList>
        {state && <div className="error">Existe un error en las fechas</div>}
        <div className="submit buttons">
          <IonList className="submit buttons">
            <IonItem>
              <IonButton
                className="save"
                onClick={() => {
                  setIsConfirmed(true);
                }}
              >
                Guardar
              </IonButton>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
