import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookings, getBookingsAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("day") ? 1 : searchParams.get("day");

  //subDays is a date-fns function that subtracts days from a given date
  // queryDate is a string that represents the date of the last numDays
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `day-${numDays}`],
  });

  return { isPending, bookings, error };
}
