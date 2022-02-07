import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  isPlatform,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { fishes } from "../utils/fishes_data";
import "../theme/Species.css";
import ViewSpecies from "./ViewSpecies";

export default function Species() {
  const [isFishSelected, setIsFishSelected] = useState(false);
  const [fishSelected, setFishSelected] = useState({});

  useEffect(() => {}, []);

  const handleShowFish = async (props) => {
    setIsFishSelected(true);
    setFishSelected(props);
  };

  return (
    <IonPage>
      <Fragment>
        <IonHeader className="header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-left backButton"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="#00abfb"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => {
              setIsFishSelected(false);
            }}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="12" x2="11" y2="18" />
            <line x1="5" y1="12" x2="11" y2="6" />
          </svg>
          <IonTitle className="tittle">Especies</IonTitle>
        </IonHeader>
        <IonContent>
          {!isFishSelected && (
            <IonList>
              <IonGrid className="grid">
                {fishes.map((fish) => {
                  return (
                    <IonButton
                      className="fishButton ion-text-wrap"
                      key={fish.index}
                      onClick={() => handleShowFish(fish)}
                    >
                      {fish.nombre}
                    </IonButton>
                  );
                })}
              </IonGrid>
            </IonList>
          )}
          {isFishSelected && <ViewSpecies props={fishSelected} />}
        </IonContent>
      </Fragment>
    </IonPage>
  );
}
