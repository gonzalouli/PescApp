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
            <IonCol className="topItem data">
              <p className="underline">Hora</p>
            </IonCol>
            <IonCol className="topItem data">
              <p className="underline">Altura</p>
            </IonCol>
            <IonCol className="topItem data">
              <p className="underline">Tipo</p>
            </IonCol>
          </IonItemDivider>
        </IonRow>
        {marea.map((element) => {
          return (
            <IonRow className="grid-row">
              <IonItemDivider className="itemDivider">
                <IonCol className="topItem data">{element.hora}</IonCol>
                <IonCol className="topItem data">{element.altura}</IonCol>
                <IonCol className="topItem data">
                  {element.tipo.replace("b", "B").replace("p", "P")}
                </IonCol>
              </IonItemDivider>
            </IonRow>
          );
        })}
      </IonGrid>
    </Fragment>
  );
}
