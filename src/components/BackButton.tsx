import { IonAlert, IonBackButton, IonButton, IonButtons } from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router";
import "../theme/BackButton.css";
export default function BackButton({ refer = "/" }) {
  const [back, setBack] = useState(false);

  return (
    <Fragment>
      {back && <Redirect to={refer} exact={true} />}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-arrow-left backButton"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="#00abfb"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        onClick={() => {
          setBack(true);
        }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="5" y1="12" x2="11" y2="18" />
        <line x1="5" y1="12" x2="11" y2="6" />
      </svg>
    </Fragment>
  );
}
