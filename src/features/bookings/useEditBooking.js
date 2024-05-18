import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBooking as editBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useEditBooking() {
  const queryClient = useQueryClient();

  const { mutate: editBooking, isPending: isEditing } = useMutation({
    mutationFn: (updateBooking) => editBookingApi(updateBooking),
    onSuccess: () => {
      toast.success("Booking updated");
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { editBooking, isEditing };
}
