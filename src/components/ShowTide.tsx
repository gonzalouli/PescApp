import {
  IonCol,
  IonGrid,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonRow,
  IonTitle,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import "../theme/ShowTide.css";
import "../theme/ShowMeteorology.css";
export default function ShowTide(props) {
  const [datos, setDatos] = useState(props.props.mareas);
  const [marea, setMarea] = useState(datos.datos.marea);

  useEffect(() => {
    // console.log(datos.puerto);
    // console.log(marea);
  }, [datos, marea]);

  return (
    <Fragment>
      <IonItem>
        <IonTitle className="ion-text-wrap place ">{datos.puerto}</IonTitle>
      </IonItem>

      <IonGrid className="grid-row">
        <IonRow className="grid-row">
          <IonItemDivider className="itemDivider">
            <IonCol className="topItem label">Hora</IonCol>
            <IonCol className="topItem label">Altura</IonCol>
            <IonCol className="topItem label">Tipo</IonCol>
          </IonItemDivider>
        </IonRow>
        {marea.map((element) => {
          return (
            <IonRow className="grid-row">
              <IonCol className="topItem label">{element.hora}</IonCol>
              <IonCol className="topItem label">{element.altura}</IonCol>
              <IonCol className="topItem label">{element.tipo}</IonCol>
            </IonRow>
          );
        })}
      </IonGrid>
    </Fragment>
  );
}
