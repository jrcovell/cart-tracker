import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useStartRound() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: startRound, isPending: isStartRound } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "playing",
        notes: "Round started by staff",
        startTime: new Date().toTimeString().slice(0, 5),
      }),
    onSuccess: (data) => {
      //* onSuccess receives the data returned by the mutationFn (updateBooking)
      //* console.log(data) // {id: 1, status: 'checked-in', notes: 'Checked in by staff'}
      toast.success(`Booking #${data.id} starting round`);
      queryClient.invalidateQueries({ active: true }); //* alternative to what we used with carts to invalidate ({ queryKey: ['booking']})
      //* active = invalidate all queries that are currently active on page
      navigate("/bookings");
    },
    onError: () => {
      toast.error("Error occurred while checking in");
    },
  });

  return { startRound, isStartRound };
}
