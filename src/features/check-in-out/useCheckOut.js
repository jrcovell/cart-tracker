import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkOut, isPending: isCheckOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "completed",
        notes: "Checked out by staff",
        endTime: new Date().toTimeString().slice(0, 5),
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked out`);
      queryClient.invalidateQueries({ active: true });

      //   navigate("/"); //* commented out to prevent redirect to dashboard
    },
    onError: () => {
      toast.error("Error occurred while checking out");
    },
  });

  return { checkOut, isCheckOut };
}
