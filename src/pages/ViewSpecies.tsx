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
import { API, Auth } from "aws-amplify";
import { Redirect } from "react-router";
import "../theme/MyActivityWithId.css";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFReader } from "react-read-pdf";
import { MobilePDFReader } from "react-read-pdf";

import "../theme/ViewSpecies.css";

export default function ViewSpecies(props) {
  const [error, setError] = useState({ error: false, message: "" });

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [movile, setMovile] = useState(false);

  useEffect(() => {
    if (isPlatform("android") || isPlatform("ios")) {
      setMovile(true);
    }
  }, []);

  return (
    <IonPage>
      <Fragment>
        <IonContent>
          {movile && (
            <div className="visor">
              <MobilePDFReader
                className="reader"
                url={
                  process.env.PUBLIC_URL + "/assets/fishes/" + props.props.url
                }
                scale="auto"
              />
            </div>
          )}
          {!movile && (
            <div className="visor">
              <PDFReader
                className="reader"
                url={
                  process.env.PUBLIC_URL + "/assets/fishes/" + props.props.url
                }
              />
            </div>
          )}
          {error.error === true && (
            <IonItem>
              <IonLabel className="error ion-text-wrap">
                {error.message}
              </IonLabel>
            </IonItem>
          )}
        </IonContent>
      </Fragment>
    </IonPage>
  );
}
