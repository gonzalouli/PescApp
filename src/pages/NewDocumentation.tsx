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
  IonPage,
  IonTextarea,
  IonTitle,
  isPlatform,
} from "@ionic/react";
import { nanoid } from "nanoid";
import React, { useRef, useState } from "react";
import BackButton from "../components/BackButton";
import RefreshComponent from "../components/RefreshComponent";
import "../theme/NewDocumentation.css";

export default function NewDocumentation() {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(
    process.env.PUBLIC_URL + "/assets/placeholderimage.jpg"
  );
  const [name, setName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>();
  const [tempLicense, setTempLicense] = useState(
    JSON.parse(window.sessionStorage.getItem("license")) || []
  );

  const [piece, setPiece] = useState({
    id: nanoid(),
    name: "",
    imageUrl: imageUrl,
    description: "",
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setPiece({ ...piece, imageUrl: imageUrl });
    }
  };

  const handlePictureClick = async () => {
    //for right platforms
    if (isPlatform("android") || isPlatform("ios")) {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
        });
        console.log(image);

        setImageUrl(image.dataUrl);
        setPiece({ ...piece, imageUrl: image.dataUrl });
      } catch (error) {
        console.error("Camera Error:", error.message);
      }
    } else {
      fileInputRef.current.click();
    }
  };

  const handleTextChange = (e) => {
    setDescription(e.target.value);
    setPiece({ ...piece, description: description });
  };

  const handleName = (e) => {
    setName(e.target.value);
    setPiece({ ...piece, name: name });
  };

  const saveAndBack = async () => {
    const license = JSON.parse(window.sessionStorage.getItem("license"));
    await license.push(piece);
    window.sessionStorage.setItem("license", JSON.stringify(license));
  };

  const saveAndNew = async () => {
    const license = JSON.parse(window.sessionStorage.getItem("license"));

    await license.push(piece);
    window.sessionStorage.setItem("license", JSON.stringify(license));

    setTempLicense(license);

    setName("");
    setImageUrl(process.env.PUBLIC_URL + "/assets/placeholderimage.jpg");
    setDescription("");
    setPiece({
      id: nanoid(),
      name: name,
      imageUrl: imageUrl,
      description: description,
    });
  };

  const deletePiece = (id, e) => {
    let license = JSON.parse(window.sessionStorage.getItem("license"));

    license = license.filter((piece) => piece.id !== id.id);
    setTempLicense(license);
    window.sessionStorage.setItem("license", JSON.stringify(license));
  };

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/my/Documentation" />
        <IonTitle className="tittle">Nueva Doc.</IonTitle>
      </IonHeader>
      <IonContent>
        <RefreshComponent />
        <IonList className="form-container">
          <IonItem>
            <IonLabel className="label" position="floating">
              Nombre
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

            <img src={imageUrl} alt="" onClick={handlePictureClick} />
          </IonItem>

          <IonItem className="description">
            <IonLabel className="label" position="floating">
              Descripción
            </IonLabel>
            <IonTextarea
              value={description}
              onIonChange={handleTextChange}
            ></IonTextarea>
          </IonItem>
          <div className="buttons">
            <IonItem>
              <IonButton className="save" onClick={saveAndBack}>
                Guardar
              </IonButton>
            </IonItem>
            <IonItem>
              <IonButton className="save" onClick={saveAndNew}>
                Guardar y nuevo
              </IonButton>
            </IonItem>
          </div>
        </IonList>

        <IonList className="capturas">
          <IonItem className="capturas">
            <IonLabel className="capturasNuevas label">
              Capturas actuales
            </IonLabel>
          </IonItem>
          <IonList>
            {tempLicense.map((item) => {
              return (
                <IonCard className="card" key={item.id}>
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
                    <IonCardTitle className="name">{item.name}</IonCardTitle>
                    <div className="card-img">
                      <img src={item.imageUrl} alt={item.id} />
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
