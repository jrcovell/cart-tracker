
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const {bookingId} = useParams(); // from url http://localhost:5173/bookings/12
 

//& const x = useQuery({ //* useQuery custom hook from react-query
const {
  isPending, 
  data: booking,
error,
} = useQuery({ 
    queryKey: ['booking', bookingId], // bookingId needed else react-query shows same data for all bookings  
    queryFn: () => getBooking(bookingId), 
    retry: false // react query will retry 3 times by default, set to false to avoid retrying
  }) 
  //& console.log(x) //* logs the data from the api data:, isLoading: true, error: undefined, isStale, etc.
  
  //& if (isLoading) return <p>Loading...</p> //* if data is loading, display 'Loading...'

return {isPending, booking, error}

}