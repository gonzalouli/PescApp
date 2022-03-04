import { Camera, CameraResultType } from "@capacitor/camera";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  isPlatform,
} from "@ionic/react";
import { sha256 } from "js-sha256";

import React, { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import "../theme/NewDocumentation.css";
import { getDataUrl } from "../utils/get-data-url";
import { ResetLS } from "../utils/ResetLocalStorage";
import { API, Auth } from "aws-amplify";
import { Redirect } from "react-router";

export default function NewDocumentation() {
  useEffect(() => {
    ResetLS();
    try {
      const CognitoUser = isAuth();
      if (CognitoUser == null) {
        Auth.signOut();
        setLogOut(true);
      }
    } catch (error) {
      Auth.signOut();
      setLogOut(true);
    }
  }, []);
  const [logOut, setLogOut] = useState(false);
  const [back, setBack] = useState(false);

  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(
    process.env.PUBLIC_URL + "/assets/placeholderimage.jpg"
  );
  const [name, setName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>();
  const [tempLicense, setTempLicense] = useState(
    JSON.parse(window.sessionStorage.getItem("license")) || []
  );
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({ success: false, message: "" });
  const [showLoading, setShowLoading] = useState(false);
  const [savedPhoto, setSavedPhoto] = useState(false);
  const isAuth = async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      setLogOut(true);
      console.error("Ususario no loggeado: " + error.message);
      return null;
    }
  };

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
    e.preventDefault();
    setDescription(e.detail.value);
    setPiece({ ...piece, description: e.detail.value });
  };

  const handleName = (e) => {
    setName(e.target.value);
    setPiece({ ...piece, name: e.target.value });
  };

  const saveAndBack = async () => {
    setShowLoading(true);
    // const license = JSON.parse(window.sessionStorage.getItem("license"));
    // await license.push(piece);
    // window.sessionStorage.setItem("license", JSON.stringify(license));
    try {
      const licenses = JSON.parse(window.sessionStorage.getItem("license"));
      const CognitoUser = await isAuth();
      const res = await API.post("api9000aeb3", "/licenses/createLicense", {
        body: {
          CognitoUser: CognitoUser.username,
          License: licenses,
        },
      });
      if (res.error === true) {
        setError(res);
        return;
      }

      setSuccess(res);
      window.sessionStorage.removeItem("license");
      setShowLoading(false);
      setTimeout(() => {
        setBack(true);
      }, 1500);
    } catch (error) {}
  };

  const saveAndNew = async () => {
    setSavedPhoto(true);
    const license = JSON.parse(window.sessionStorage.getItem("license"));

    await license.push(piece);
    window.sessionStorage.setItem("license", JSON.stringify(license));
    setTempLicense(license);

    setPiece({
      id: "",
      name: "",
      imageUrl: process.env.PUBLIC_URL + "/assets/placeholderimage.jpg",
      description: "",
    });

    setName("");
    setImageUrl(process.env.PUBLIC_URL + "/assets/placeholderimage.jpg");

    setDescription("");

    setTimeout(() => {
      setSavedPhoto(false);
    }, 2000);
  };

  const deletePiece = async (id) => {
    let aux = [];
    let license = JSON.parse(window.sessionStorage.getItem("license"));

    aux = license.filter((piece) => piece.id !== id.id);

    setTempLicense(aux);
    window.sessionStorage.setItem("license", JSON.stringify(aux));
  };

  return (
    <IonPage>
      {logOut && <Redirect to="/" push={true} exact={true} />}
      {back && <Redirect to="/my/Documentation" push={true} exact={true} />}

      <IonHeader className="header">
        <BackButton refer="/my/Documentation" />
        <IonTitle className="tittle">Nueva Doc.</IonTitle>
      </IonHeader>
      <IonContent>
        {/* <RefreshComponent /> */}
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          message={"Por favor, espere..."}
          duration={3000}
        />
        <IonList className="form-container">
          <IonItem>
            <IonLabel className="label" position="floating">
              Escriba el nombre aquí:
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
            <div className="imageDoc">
              <img
                src={piece.imageUrl}
                alt=""
                onClick={handlePictureClick}
                defaultValue={
                  process.env.PUBLIC_URL + "/assets/placeholderimage.jpg"
                }
              />
            </div>
          </IonItem>

          <IonItem className="description">
            <IonLabel
              position="floating"
              className="label
            "
            >
              Lado
            </IonLabel>
            <IonSelect
              value={description}
              okText="Okay"
              cancelText="Cancelar"
              onIonChange={(e) => {
                handleTextChange(e);
              }}
            >
              <IonSelectOption value="Reverso">Reverso</IonSelectOption>
              <IonSelectOption value="Anverso">Anverso</IonSelectOption>
            </IonSelect>
          </IonItem>
          {error.error === true && (
            <IonItem>
              <IonLabel className="error ion-text-wrap">
                {error.message}
              </IonLabel>
            </IonItem>
          )}
          {success.success === true && (
            <IonItem>
              <IonLabel className="success label">{success.message}</IonLabel>
            </IonItem>
          )}

          <IonButton className="save" onClick={saveAndNew}>
            Añadir
          </IonButton>
          {savedPhoto && (
            <IonLabel className="label" color="success">
              Foto agregada para guardar
            </IonLabel>
          )}
          <IonButton className="save saveGuardar" onClick={saveAndBack}>
            Guardar
          </IonButton>
        </IonList>

        <IonList className="capturas">
          <IonItem className="capturas">
            <IonLabel className="capturasNuevas label">
              Capturas actuales
            </IonLabel>
          </IonItem>
          <IonList>
            {tempLicense?.map((item) => {
              return (
                <IonCard className="card" key={item.id}>
                  <IonCardHeader className="card">
                    <IonButton
                      className="delete"
                      onClick={() => deletePiece(item)}
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
                    <IonCardTitle className="name">{item.name}</IonCardTitle>
                    <div className="card-img">
                      <img
                        className="showImage"
                        src={item.imageUrl}
                        alt={item.id}
                      />
                    </div>
                  </IonCardHeader>
                  <IonCardContent className="card-desc">
                    {item.description}
                  </IonCardContent>
                </IonCard>
              );
            })}
          </IonList>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
