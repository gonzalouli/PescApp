import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
} from "@ionic/react";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { API, Auth } from "aws-amplify";
import ShowTide from "../components/ShowTide";
import "../theme/Tide.css";

export default function Tide() {
  const [showLoading, setShowLoading] = useState(false);
  const [haveTide, setHaveTide] = useState(false);
  const minDate = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(minDate);
  const [selectedPort, setSelectedPort] = useState("");
  const [status, setStatus] = useState({ error: false, message: "" });
  const [ports, setPorts] = useState([]);
  const [tides, setTides] = useState({});

  useEffect(() => {
    async function fetchApi() {
      setPorts(await API.get("api9000aeb3", "/ports/getPorts", {}));
    }
    fetchApi();
  }, []);

  const searchTide = async () => {
    setHaveTide(false);

    if (selectedPort === "") {
      setStatus({ error: true, message: "Seleccione un puerto" });
      return;
    } else {
      setTides(
        await API.post("api9000aeb3", "/ports/getTide", {
          body: {
            port: selectedPort,
            date: selectedDate,
          },
        })
      );
    }

    setHaveTide(true);
  };

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/my/MeteorologyOrTide" />
        <IonTitle className="tittle">Mareas</IonTitle>
      </IonHeader>
      <IonContent>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          message={"Por favor, espere..."}
          duration={4000}
        />

        <Fragment>
          {status.error && <div className="error">{status.message}</div>}

          <IonItem>
            <IonLabel className="label" position="stacked">
              Puerto
            </IonLabel>
            <IonSelect
              interface="action-sheet"
              okText="Aceptar"
              cancelText="Cancelar"
              onIonChange={(e) => setSelectedPort(e.detail.value)}
            >
              {ports.map((e) => {
                return (
                  <IonSelectOption
                    className="options ion-text-wrap"
                    value={e.id}
                    key={e.id}
                  >
                    <IonLabel className="ion-text-wrap">
                      {e.description}
                    </IonLabel>
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
          <IonItem className="writeOption">
            <IonLabel className="label">Fechas disponibles: </IonLabel>
            <IonDatetime
              value={selectedDate}
              defaultValue={minDate}
              onIonChange={(e) => {
                setSelectedDate(e.detail.value);
              }}
              displayFormat="YYYY-MM-DD"
            ></IonDatetime>
          </IonItem>
          {status.error && <div className="error">{status.message}</div>}

          <IonButton className="save" onClick={searchTide}>
            Buscar
          </IonButton>
        </Fragment>

        {haveTide && <ShowTide props={tides} />}
      </IonContent>
    </IonPage>
  );
}
