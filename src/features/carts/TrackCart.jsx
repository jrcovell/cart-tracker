import { HiMapPin } from "react-icons/hi2";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useContext, useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { updateLocation } from "../../services/apiCarts";
import { useGeolocated } from "react-geolocated";
import { get } from "react-hook-form";
function TrackCart({ cart }) {
  const [monitorLocation, setMonitorLocation] = useState(true);
  // const [intervalId, setIntervalId] = useState(null);

  function stopTracking() {
    console.log("stop tracking");
    setMonitorLocation(true);
  }
  function useHandleActive() {
    console.log("start tracking");
    setMonitorLocation(!monitorLocation);
  }
  // function useHandleActive() {
  //   console.log("start tracking");
  //   setMonitorLocation(!monitorLocation);

  //   setTimeout(() => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         console.log(position);
  //         const { latitude, longitude } = position.coords;
  //         console.log(latitude, longitude, cart.id);
  //         updateLocation({
  //           cartId: cart.id,
  //           latitude: latitude,
  //           longitude: longitude,
  //         });
  //       });
  //     }
  //   }, 5000);
  // }
  //*   await new Promise((res) => setTimeout(res, 3000)); might be useful

  useEffect(() => {
    if (monitorLocation) return;
    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude, cart.id);
          updateLocation({
            cartId: cart.id,
            latitude: latitude,
            longitude: longitude,
          });
        });
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [monitorLocation]);

  return (
    <div>
      <Modal>
        <Modal.OpenButton open="track-cart">
          <Button
            size="large"
            variation={monitorLocation ? "active" : "danger"}
          >
            <HiMapPin />
          </Button>
        </Modal.OpenButton>
        <Modal.Window name="track-cart" monitorLocation={monitorLocation}>
          <>
            <Button
              variation={monitorLocation ? "active" : "danger"}
              onClick={monitorLocation ? useHandleActive : stopTracking}
            >
              {monitorLocation ? "Start Tracking" : "Stop Tracking"}{" "}
            </Button>

            {!monitorLocation && (
              <div>
                <Spinner />
                <p>Latitude: {cart.latitude}</p>
                <p>Longitude: {cart.longitude}</p>
              </div>
            )}
          </>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default TrackCart;
