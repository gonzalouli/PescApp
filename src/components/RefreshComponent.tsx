import { IonRefresher, IonRefresherContent } from "@ionic/react";
import React from "react";
import { RefresherEventDetail } from "@ionic/core";
import { Redirect } from "react-router";

export default function RefreshComponent(goto) {
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      <Redirect to={goto} push={true} exact={true} />;
      event.detail.complete();
    }, 1000);
  }
  return (
    <IonRefresher
      slot="fixed"
      onIonRefresh={doRefresh}
      pullFactor={0.5}
      pullMin={40}
      pullMax={60}
    >
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
  );
}
