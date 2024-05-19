//! usemutation hook to update cart location (when loading map page and optional button on the page)
import { updateLocation as updateLocationApi } from "../../services/apiCarts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLocation() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateLocation } = useMutation({
    //* update  cart locations
    mutationFn: ({ id, lat, lng }) => updateLocationApi(id, lat, lng),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (err) => console.error(err.message),
  });

  return { isUpdating, updateLocation };
}
