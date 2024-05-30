import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updateLocation as updateLocationApi } from "../../services/apiCarts";
import { ca } from "date-fns/locale";

export function useGetLocation() {
  const queryClient = useQueryClient();

  const { mutate: updateLocation, isPending: isUpdating } = useMutation({
    mutationFn: (cart) => updateLocationApi(cart),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (err) => console.log(err.message),
  });
  return { updateLocation, isUpdating };
}

/*
  console.log(cartId);

if (navigator.geolocation) {
navigator.permissions
.query({ name: "geolocation" })
.then(function (result) {
  console.log(result);
  if (result.state === "granted") {
    //If granted then you can directly call your function here
    navigator.geolocation.getCurrentPosition(success, errors, options);
  } else if (result.state === "prompt") {
    //If prompt then the user will be asked to give permission
    navigator.geolocation.getCurrentPosition(success, errors, options);
  } else if (result.state === "denied") {
    //If denied then you have to show instructions to enable location
  }

}
/*
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return { success, errors };
}
*/
