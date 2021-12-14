import * as ReactDom from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards"
import  React, {useState, useEffect, Fragment} from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { IonLoading, IonToast } from "@ionic/react";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

interface LocationError{
  showError: boolean;
  message?: string
}

interface Coordinates{
lat: number,
lng: number,
}

const MapComponent: React.VFC = () => {
  const [marker, setMarker] = useState<Coordinates>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<LocationError>({showError: false})

  const [clicks, setClicks] = React.useState<google.maps.LatLng>();
  const [zoom, setZoom] = React.useState(14); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const currentPosition = async() => {
    setLoading(true)
    try{
        const activity = JSON.parse(window.sessionStorage.getItem("newActivity"))
        console.log(activity.localization.coords===undefined)
        if(activity.localization.coords===undefined){

          const position= await Geolocation.getCurrentPosition();
          setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
          setMarker({lat: position.coords.latitude, lng:position.coords.longitude})
          activity.localization.coords = {lat: position.coords.latitude, lng: position.coords.longitude}
          window.sessionStorage.setItem('newActivity', JSON.stringify(activity))

        }else{
          const activity = JSON.parse(window.sessionStorage.getItem("newActivity"))
          setCenter({lat: activity.localization.coords.lat, lng: activity.localization.coords.lng})
          setMarker({lat: activity.localization.coords.lat, lng:activity.localization.coords.lng})
         
        }

        setLoading(false)
        setError({showError: false, message: undefined,})
    } catch (error) {
        const message = error.message.length >0 ? error.message: "No se pudo localizar..."
        setError({showError: true, message})
        setLoading(false)

    }
  };

  React.useEffect(()=>{
      currentPosition()
  },[])

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks(e.latLng);
    setMarker({lat: e.latLng.lat(), lng: e.latLng.lng()})
    const activity = JSON.parse(window.sessionStorage.getItem("newActivity"))
    activity.localization.coords = {lat: e.latLng.lat(), lng: e.latLng.lng()}
    window.sessionStorage.setItem('newActivity', JSON.stringify(activity))
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };


  return (
    <Fragment>
    <IonLoading isOpen={loading} message={"Tomando posición..."} onDidDismiss={()=>{setLoading(false)}}/>
    <IonToast isOpen={error.showError} message={error.message} duration={3000} onDidDismiss={()=>{setError({message: undefined, showError: false})}} />    
    <div className="map-container" style={{ display: "flex", height: "80%" }}>
      <Wrapper apiKey={"AIzaSyD35fG5wYOtLp68_0XIvZmzz4CJD-YB6mk"} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "85%" }}
        >
          {marker!=null ? <Marker position={{lat: marker.lat, lng: marker.lng}} ></Marker> : null}           
        </Map>
      </Wrapper>
    </div>
    </Fragment>
  );
};



interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);


  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}


export default MapComponent;

