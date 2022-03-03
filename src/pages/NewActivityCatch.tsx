import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  isPlatform,
} from "@ionic/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import RefreshComponent from "../components/RefreshComponent";
import { Camera, CameraResultType } from "@capacitor/camera";
import "../theme/NewActivityCatch.css";
import { randomBytes } from "crypto";
import "../theme/NewDocumentation.css";
import { Redirect } from "react-router";
import { ResetLS } from "../utils/ResetLocalStorage";
import { getDataUrl } from "../utils/get-data-url";
import { sha256 } from "js-sha256";

export default function NewActivityCatch() {
  const [tempactivity, setTempactivity] = useState(
    JSON.parse(window.sessionStorage.getItem("newActivity")) || []
  );
  const [savedPhoto, setSavedPhoto] = useState(false);

  useEffect(() => {
    ResetLS();
  }, [tempactivity.catches]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(
    process.env.PUBLIC_URL + "/assets/placeholderimage.jpg"
  );
  const [name, setName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [piece, setPiece] = useState({
    id: "",
    name: "",
    imageUrl: process.env.PUBLIC_URL + "/assets/placeholderimage.jpg",
    description: "",
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const imgUrl: string | ArrayBuffer = await getDataUrl(file);
      if (typeof imgUrl === "object") {
        setPiece({
          ...piece,
          imageUrl: String.fromCharCode.apply(null, new Uint16Array(imgUrl)),
          id: sha256(
            name +
              new Date().toString() +
              description +
              piece.imageUrl.slice(50, 65)
          ),
        });
        // setImageUrl(String.fromCharCode.apply(null, new Uint16Array(imgUrl)));
      } else if (typeof imgUrl === "string") {
        // setImageUrl(imgUrl);
        setPiece({
          ...piece,
          imageUrl: imgUrl,
          id: sha256(
            name +
              new Date().toString() +
              description +
              piece.imageUrl.slice(50, 65)
          ),
        });
      }

      // setPiece({ ...piece, imageUrl });
    }
  };

  const handlePictureClick = async () => {
    //for right platforms
    if (isPlatform("android") || isPlatform("ios") || isPlatform("mobile")) {
      try {
        const image = await Camera.getPhoto({
          quality: 70,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
        });
        // console.log(image);

        setImageUrl(image.dataUrl);
        setPiece({
          ...piece,
          imageUrl: image.dataUrl,
          id: sha256(
            name +
              new Date().toString() +
              description +
              piece.imageUrl.slice(50, 65)
          ),
        });
      } catch (error) {
        console.error("Camera Error:", error.message);
      }
    } else {
      fileInputRef.current.click();
    }
  };

  const handleTextChange = (e) => {
    setDescription(e.target.value);
    setPiece({ ...piece, description: e.target.value });
  };

  const handleName = (e) => {
    setName(e.target.value);
    setPiece({ ...piece, name: e.target.value });
  };

  const saveAndBack = async () => {
    setIsConfirmed(true);
  };

  const saveAndNew = async () => {
    setSavedPhoto(true);

    const activity = JSON.parse(window.sessionStorage.getItem("newActivity"));

    await activity.catches.push(piece);
    window.sessionStorage.setItem("newActivity", JSON.stringify(activity));
    setTempactivity(activity);

    setPiece({
      id: "",
      name: "",
      imageUrl: process.env.PUBLIC_URL + "/assets/placeholderimage.jpg",
      description: "",
    });

    setName("");
    setImageUrl(process.env.PUBLIC_URL + "/assets/placeholderimage.jpg");

    setDescription("");
    setSavedPhoto(false);
  };

  const deletePiece = (id, e) => {
    const activity = JSON.parse(window.sessionStorage.getItem("newActivity"));
    activity.catches = activity.catches.filter((piece) => piece.id !== id.id);
    setTempactivity(activity);
    window.sessionStorage.setItem("newActivity", JSON.stringify(activity));
  };

  return (
    <IonPage>
      {isConfirmed && (
        <Redirect to="/my/NewActivity" push={true} exact={true} />
      )}
      <IonHeader className="header">
        <BackButton refer="/my/NewActivity" />
        <IonTitle className="tittle">Nueva Fotografía</IonTitle>
      </IonHeader>
      <IonContent>
        {/* <RefreshComponent /> */}
        <IonList className="form-container">
          <IonItem className="nombreFoto">
            <IonLabel className="label ion-text-wrap" position="floating">
              Nombre de fotografía:
            </IonLabel>
            <IonInput
              className="text"
              type="text"
              value={name}
              onIonChange={handleName}
            />
          </IonItem>

          <IonItem className="image">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
            ></input>

            <img
              className="imagenTemp"
              src={piece.imageUrl}
              alt=""
              onClick={handlePictureClick}
              style="max-width=480px;"
            />
          </IonItem>

          <IonItem className="description">
            <IonLabel
              className="label descriptionLabel ion-text-wrap"
              position="stacked"
            >
              Descripción de la fotografia:
            </IonLabel>
            <IonTextarea
              value={description}
              onIonChange={handleTextChange}
            ></IonTextarea>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonButton className="save label" onClick={saveAndNew}>
                    Añadir
                  </IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonList>
        {savedPhoto && (
          <IonItem>
            <IonLabel className="label ion-text-wrap" color="success">
              Foto agregada para guardar
            </IonLabel>
          </IonItem>
        )}

        <IonList className="capturas">
          <IonItem className="capturas ">
            <IonLabel className="capturasNuevas label ion-text-wrap">
              Fotografias realizadas
            </IonLabel>
          </IonItem>
          <IonList className="listaElementos">
            {tempactivity.catches.map((item) => {
              return (
                <IonCard className="card capturasNuevas" key={item.id}>
                  <IonCardHeader className="card">
                    <IonButton
                      className="delete"
                      onClick={(e) => deletePiece(item, e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-trash"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="#ff2825"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                      Borrar
                    </IonButton>
                    <IonCardTitle className="card ion-text-wrap">
                      {item.name}
                    </IonCardTitle>
                    <IonCardContent className="label ion-text-wrap">
                      Descripción: {item.description}
                    </IonCardContent>
                    <img src={item.imageUrl} alt={item.id} />
                  </IonCardHeader>
                </IonCard>
              );
            })}
          </IonList>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
