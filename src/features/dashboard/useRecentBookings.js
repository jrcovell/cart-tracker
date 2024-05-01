import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookings, getBookingsAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 1 : searchParams.get("last");

  //subDays is a date-fns function that subtracts days from a given date
  // queryDate is a string that represents the date of the last numDays
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isPending, bookings, error };
}
