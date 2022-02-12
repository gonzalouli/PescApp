import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
} from "@ionic/react";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import RefreshComponent from "../components/RefreshComponent";
import "../theme/NewActivityTackle.css";
import { ResetLS } from "../utils/ResetLocalStorage";
import { sha256 } from "js-sha256";

export default function NewActivityTackle() {
  useEffect(() => {
    ResetLS();
  }, []);
  const [items, setItems] = useState(
    JSON.parse(window.sessionStorage.getItem("newActivity")).tackle || []
  );
  const [itemName, setItemName] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    setItems([
      ...items,
      {
        id: sha256(itemName + new Date().toString()),
        name: itemName,
      },
    ]);
    setItemName("");
    const activityMod = JSON.parse(
      window.sessionStorage.getItem("newActivity")
    );
    activityMod.tackle.push({
      id: sha256(itemName + new Date().toString()),
      name: itemName,
    });
    window.sessionStorage.setItem("newActivity", JSON.stringify(activityMod));
  };

  const deleteTacke = (id, e) => {
    const newItems = items.filter((item) => item.id != id);
    setItems(newItems);
    const activityMod = JSON.parse(
      window.sessionStorage.getItem("newActivity")
    );
    activityMod.tackle = newItems;
    window.sessionStorage.setItem("newActivity", JSON.stringify(activityMod));
  };

  return (
    <IonPage>
      <IonHeader className="header">
        <BackButton refer="/my/newActivity" />
        <IonTitle className="tittle">Equipo utilizado</IonTitle>
      </IonHeader>
      <IonContent>
        {/* <RefreshComponent /> */}
        <IonLabel className="labelNombre">Nombre</IonLabel>
        <IonItem>
          <form className="formTackle" onSubmit={addItem}>
            <input
              className="addInput"
              name="item"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            ></input>
            <IonButton
              onClick={(e) => (itemName != "" ? addItem(e) : null)}
              class="buttonAdd"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-circle-plus"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
            </IonButton>
          </form>
        </IonItem>

        <IonContent className="selectedTackle">
          <IonLabel className="labelNombre">Equipo introducido:</IonLabel>

          {items.map((item) => (
            <li className="labelName" key={item.id}>
              {item.name}
              <svg
                onClick={(e) => deleteTacke(item.id, e)}
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-trash"
                width="24"
                height="24"
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
            </li>
          ))}
          <div className="submit buttons">
            <IonButton className="save" routerLink="/my/newActivity">
              Guardar
            </IonButton>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
}
