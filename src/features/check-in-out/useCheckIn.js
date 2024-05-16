import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isPending: isCheckIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        notes: "Checked in by staff",
      }),

    onSuccess: (data) => {
      //* onSuccess receives the data returned by the mutationFn (updateBooking)
      //* console.log(data) // {id: 1, status: 'checked-in', notes: 'Checked in by staff'}
      toast.success(`Booking #${data.id} has been checked in`);
      queryClient.invalidateQueries({ active: true }); //* alternative to what we used with carts to invalidate ({ queryKey: ['booking']})
      //* active = invalidate all queries that are currently active on page
      //   navigate("/");
    },
    onError: () => {
      toast.error("Error occurred while checking in");
    },
  });

  return { checkIn, isCheckIn };
}
