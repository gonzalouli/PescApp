import {
  IonDatetime,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";

export default function ShowMeteorology(props) {
  const [meteorology, setMeteorology] = useState(props.props.response);
  const [date, setDate] = useState(props.props.selectedDate);
  const minDate = moment().format("YYYY-MM-DD");

  console.log(props);
  return (
    <Fragment>
      <IonItem></IonItem>
    </Fragment>
  );
}
