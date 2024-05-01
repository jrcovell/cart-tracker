import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getRoundsAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useRecentRounds() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 1 : searchParams.get("last");

  //subDays is a date-fns function that subtracts days from a given date
  // queryDate is a string that represents the date of the last numDays
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isPending,
    data: rounds,
    error,
  } = useQuery({
    queryFn: () => getRoundsAfterDate(queryDate),
    queryKey: ["rounds", `last-${numDays}`],
  });

  //!double check this logic later!!!
  // if we want to show only confirmed rounds
  const confirmedRounds = rounds?.filter((round) => round.status === "playing");

  return { isPending, rounds, confirmedRounds, error };
}
