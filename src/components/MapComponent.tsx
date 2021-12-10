import * as React from 'react';
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import LocationPinComponent from './MarkerComponent'
import MarkerComponent from './MarkerComponent';

const MapComponent = (props={center: {
        lat: 59.95,
        lng: 30.33,
        nombre: "prueba"
      },
        zoom: 11
    }) => {
        return (
          // Important! Always set the container height explicitly
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
              defaultCenter={props.center}
              defaultZoom={props.zoom}
            >
              <MarkerComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        );
      }
    
};
