import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isPending: isCreating } = useMutation({
    mutationFn: (newBooking) => createBookingApi(newBooking),
    onSuccess: () => {
      toast.success("Booking added");
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createBooking, isCreating };
}
