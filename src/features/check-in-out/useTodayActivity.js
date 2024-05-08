import { useQuery } from "@tanstack/react-query";
import { getRoundsTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isPending, data: rounds } = useQuery({
    queryFn: getRoundsTodayActivity,
    queryKey: ["today"],
  });

  return {
    isPending,
    rounds,
  };
}
