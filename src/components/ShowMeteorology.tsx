import {
  IonCol,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import "../theme/ShowMeteorology.css";
import { Redirect } from "react-router";

export default function ShowMeteorology(props) {
  const [meteorology, setMeteorology] = useState(props.props.response);
  const [hourly, setHourly] = useState(props.props.response.hourly);

  const [date, setDate] = useState(moment(props.props.selectedDate));
  const nowDate = moment().format("YYYY-MM-DD");
  const [index, setIndex] = useState(date.diff(nowDate, "days"));
  const [dataTransformed, setDataTransformed] = useState(false);

  useEffect(() => {
    // console.log(props);
    // console.log(meteorology);
    // console.log(index);
    // console.log(meteorology.daily[index].temp.day);
    let finded = false;
    if (index === 1) {
      for (let i = 0; i < hourly.length && !finded; i++) {
        if (toHourFormated(hourly[i].dt) === "0:00") {
          setHourly(hourly.slice(i, hourly.length));
          finded = true;
        }
      }
    }
    if (index === 0) {
      for (let i = 0; i < hourly.length && !finded; i++) {
        if (toHourFormated(hourly[i].dt) === "0:00") {
          setHourly(hourly.slice(0, i));
          finded = true;
        }
      }
    }
    console.log(props);
    setDataTransformed(true);
  }, []);

  const toDegree = (g) => {
    const degree = Number(g);
    if (degree > 350 || (degree > 0 && degree <= 10)) return "N";
    if (10 < degree && degree <= 35) return "N-NE";
    if (35 < degree && degree <= 55) return "NE";
    if (55 < degree && degree <= 80) return "E-NE";
    if (80 < degree && degree <= 100) return "E";

    if (100 < degree && degree <= 125) return "E-SE";
    if (125 < degree && degree <= 145) return "SE";
    if (145 < degree && degree <= 170) return "S-SE";
    if (170 < degree && degree < 190) return "S";

    if (190 < degree && degree <= 215) return "S-SW";
    if (215 < degree && degree <= 245) return "SW";
    if (245 < degree && degree <= 260) return "W-SW";
    if (260 < degree && degree <= 280) return "W";

    if (280 < degree && degree <= 305) return "W-NW";
    if (305 < degree && degree <= 325) return "NW";
    if (325 < degree && degree <= 350) return "N-NW";
  };

  const toDateFormated = (time) => {
    const date = new Date(time * 1000);
    let minutes = date.getMinutes().toString();
    if (minutes.length === 1) {
      minutes = 0 + minutes;
    }
    return date.getHours() + ":" + minutes;
  };
  const toHourFormated = (time) => {
    const date = new Date(time * 1000);
    return date.getUTCHours() + ":00";
  };

  return (
    <Fragment>
      <Fragment>
        <IonGrid className="grid">
          <IonRow className="grid-row">
            <IonItemDivider className="itemDivider">
              <IonCol className="topItem data">
                <img
                  alt="hour "
                  src={`${process.env.PUBLIC_URL}/assets/icon/lessTemp.png`}
                />
              </IonCol>
              <IonCol className="topItem data">
                <img
                  alt="hour "
                  src={`${process.env.PUBLIC_URL}/assets/icon/windIcon.png`}
                />
              </IonCol>
              <IonCol className="topItem data">
                <img
                  alt="hour "
                  src={`${process.env.PUBLIC_URL}/assets/icon/rainIcon.png`}
                />
              </IonCol>
              <IonCol className="topItem data">
                <img
                  alt="hour "
                  src={`${process.env.PUBLIC_URL}/assets/icon/tempIcon.png`}
                />
              </IonCol>
            </IonItemDivider>
          </IonRow>
          <IonItemDivider className="itemDivider">
            <IonCol className="topItem data">
              {meteorology.daily[index].temp.min.toFixed(0) - 273} °C
            </IonCol>
            <IonCol className="topItem data">
              {(meteorology.daily[index].wind_speed * 1.94384).toFixed(2)} Nudos
              a {toDegree(meteorology.daily[index].wind_deg)}
            </IonCol>
            <IonCol className="topItem data">
              {meteorology.daily[index].weather[0].description.toUpperCase()}
            </IonCol>
            <IonCol className="topItem data">
              {meteorology.daily[index].temp.max.toFixed(0) - 273} °C
            </IonCol>
          </IonItemDivider>
        </IonGrid>
        <IonItem>
          <IonLabel className="label ion-text-wrap nextHours">
            Datos de ambiente
          </IonLabel>
        </IonItem>
        <IonGrid className="grid">
          <IonRow className="grid-row">
            <IonItemDivider className="itemDivider">
              <IonCol className="topItem data text">
                <p className="underline">Salida de la luna</p>
              </IonCol>
              <IonCol className="topItem data  text">
                {" "}
                <p className="underline">Puesta de la luna</p>
              </IonCol>
              <IonCol className="topItem data  text">
                {" "}
                <p className="underline">Salida del sol</p>
              </IonCol>
              <IonCol className="topItem data  text">
                {" "}
                <p className="underline">Puesta de Sol</p>
              </IonCol>
            </IonItemDivider>
          </IonRow>
          <IonItemDivider className="itemDivider">
            <IonCol className="topItem data">
              {toDateFormated(meteorology.daily[index].moonrise)}
            </IonCol>
            <IonCol className="topItem data">
              {toDateFormated(meteorology.daily[index].moonset)}
            </IonCol>
            <IonCol className="topItem data">
              {toDateFormated(meteorology.daily[index].sunrise)}
            </IonCol>
            <IonCol className="topItem data">
              {toDateFormated(meteorology.daily[index].sunset)}
            </IonCol>
          </IonItemDivider>
        </IonGrid>
        <IonGrid className="grid">
          <IonRow className="grid-row">
            <IonItemDivider className="itemDivider">
              <IonCol className="topItem data text">
                <p className="underline">Humedad</p>{" "}
              </IonCol>
              <IonCol className="topItem data text">
                <p className="underline">Presión</p>
              </IonCol>
              <IonCol className="topItem data text">
                <p className="underline">Factor UVI</p>
              </IonCol>
              <IonCol className="topItem data text">
                <p className="underline">Ráfaga máxima de viento</p>
              </IonCol>
            </IonItemDivider>
          </IonRow>
          <IonItemDivider className="itemDivider">
            <IonCol className="topItem data">
              {meteorology.daily[index].humidity} %
            </IonCol>
            <IonCol className="topItem data">
              {meteorology.daily[index].pressure} hPa
            </IonCol>
            <IonCol className="topItem data">
              {meteorology.daily[index].uvi}
            </IonCol>
            <IonCol className="topItem data">
              {(meteorology.daily[index].wind_gust * 1.94384).toFixed(2)} Nudos
            </IonCol>
          </IonItemDivider>
        </IonGrid>
      </Fragment>

      {index < 2 && (
        <Fragment>
          <IonItem>
            <IonLabel className="label ion-text-wrap nextHours">
              Datos por hora
            </IonLabel>
          </IonItem>

          <IonGrid className="grid">
            <IonRow className="grid-row">
              <IonItemDivider className="itemDivider">
                <IonCol color="secondary" className="topItem data">
                  <p className="underline">Hora</p>
                </IonCol>
                <IonCol color="secondary" className="topItem data">
                  <p className="underline">Velocidad viento</p>
                </IonCol>
                <IonCol color="secondary" className="topItem data">
                  <p className="underline">Ráfaga maxima (Nudos)</p>
                </IonCol>
                <IonCol color="secondary" className="topItem data">
                  <p className="underline">°C</p>
                </IonCol>
              </IonItemDivider>
            </IonRow>
            {hourly.map((hour) => {
              return (
                <IonRow className="grid-row" key={hour.id}>
                  <IonItemDivider className="itemDivider">
                    <IonCol className="topItem data">
                      {toHourFormated(hour.dt)}
                    </IonCol>
                    <IonCol className="topItem data">
                      {(hour.wind_speed * 1.94384).toFixed(2)} a{" "}
                      {toDegree(hour.wind_deg)}
                    </IonCol>
                    <IonCol className="topItem data">
                      {(hour.wind_gust * 1.94384).toFixed(2)}
                    </IonCol>
                    <IonCol className="topItem data">
                      {hour.temp.toFixed(0) - 273}
                    </IonCol>
                  </IonItemDivider>
                </IonRow>
              );
            })}
          </IonGrid>
        </Fragment>
      )}
      {meteorology.alerts !== undefined && (
        <IonTitle size="large" className="label error">
          Alertas
        </IonTitle>
      )}
      {meteorology.alerts !== undefined &&
        meteorology.alerts.map((d) => {
          return (
            <IonRow>
              <IonLabel className="label ion-text-wrap">
                {d.description}
              </IonLabel>
            </IonRow>
          );
        })}
      <IonItem>
        <IonLabel className="refer ion-text-wrap">
          Por: Agencia Estatal de Meteorología - AEMET. Gobierno de España{" "}
        </IonLabel>
      </IonItem>
    </Fragment>
  );
}
