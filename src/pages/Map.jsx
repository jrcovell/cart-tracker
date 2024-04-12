import {useJsApiLoader, GoogleMap, MarkerF, InfoWindow} from '@react-google-maps/api';
import { useState } from "react";


const center = {
    lat: 40.156118,
    lng: -75.490265
}



const cartOne = {
    lat: 40.158986, 
    lng: -75.487335
}

const cartTwo = {
    lat: 40.150908, 
    lng: -75.491114
}

function Map() {
    
    const [currentLocation,setCurrentLocation] = useState([]);
  
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA2Bd6UgLUAt-MUAg564Rh1VWnhHmp2rvg"
    });
    return isLoaded ? (
    <>
        <GoogleMap
        center={center}
        zoom={16}
        mapContainerStyle={{width: '70%', height: '100vh'}}
        options={{
            mapTypeId: 'satellite',
            zoomControl: false,
            tilt: 45,
            streetViewControl: false,
            mapTypeControl: false,
            rotateControl: true,
            fullscreenControl: false,
        }}
        >
            <MarkerF position={cartOne}
            onClick={()=>setCurrentLocation(cartOne)}
            >
                <InfoWindow position={cartOne}>
                        <h2>Cart 1</h2> 
                </InfoWindow>
        
            </MarkerF>

            <MarkerF position={cartTwo}
            onClick={()=>setCurrentLocation(cartOne)}
            >
                <InfoWindow position={cartTwo} onCloseClick={()=>setCurrentLocation({})}>
                    <div>
                        <h2>Cart 2</h2>
                    </div>
                </InfoWindow>
            
            </MarkerF>
            {/* <Marker position={cartTwo}></Marker> */}
             
        </GoogleMap>
        </> 
    ) : <p>Loading...</p>
}

export default Map
