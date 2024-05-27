//! move logic to hooks/features. general rule of thumb is to keep components as dumb as possible

import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCarts } from "../carts/useCarts";
import Spinner from "../../ui/Spinner";

const center = {
  lat: 40.156118,
  lng: -75.490265,
};

const cartOne = {
  lat: 40.158986,
  lng: -75.487335,
};

const cartTwo = {
  lat: 40.150908,
  lng: -75.491114,
};

function MapLayout() {
  const { isPending, carts, error } = useCarts();
  //   const { isUpdating, updateLocation } = useLocation();
  const moveBack = useMoveBack();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA2Bd6UgLUAt-MUAg564Rh1VWnhHmp2rvg",
  });

  if (isPending) return <Spinner />;

  // console.log(
  //   carts.map((cart) => ({
  //     lat: cart.latitude,
  //     lng: cart.longitude,
  //   }))
  // );

  // console.log(carts.map((cart) => cart.cartLocation));

  return isLoaded ? (
    <>
      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

      <GoogleMap
        center={center}
        zoom={16}
        mapContainerStyle={{ width: "70%", height: "100vh" }}
        options={{
          mapTypeId: "satellite", // "roadmap", "satellite", "hybrid", "terrain
          zoomControl: false,
          tilt: 45,
          streetViewControl: false,
          mapTypeControl: false,
          rotateControl: true,
          fullscreenControl: false,
          rotate: 20,
        }}
      >
        {carts.map((cart) =>
          //! change this to active maybe? boolean when cart is active on the map
          cart.cartLocation ? (
            <MarkerF
              key={cart.id}
              position={{
                lat: cart.latitude,
                lng: cart.longitude,
              }}
            >
              <InfoWindow position={cart.cartLocation}>
                <div>
                  <h2>{cart.number}</h2>
                  {/* <p>{cart.description}</p> */}
                </div>
              </InfoWindow>
            </MarkerF>
          ) : null
        )}

        {/* <MarkerF position={cartOne} onClick={() => setCurrentLocation(cartOne)}>
          <InfoWindow position={cartOne}>
            <h2>Cart 1</h2>
          </InfoWindow>
        </MarkerF> */}

        {/* <MarkerF position={cartTwo} onClick={() => setCurrentLocation(cartOne)}>
          <InfoWindow
            position={cartTwo}
            onCloseClick={() => setCurrentLocation({})}
          >
            <div>
              <h2>Cart 2</h2>
            </div>
          </InfoWindow>
        </MarkerF> */}
      </GoogleMap>
    </>
  ) : (
    <Spinner />
  );
}

export default MapLayout;
