import { IonRefresher, IonRefresherContent } from "@ionic/react";
import React from "react";
import { RefresherEventDetail } from "@ionic/core";

export default function RefreshComponent() {
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      window.location.reload();
      event.detail.complete();
    }, 2000);
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
