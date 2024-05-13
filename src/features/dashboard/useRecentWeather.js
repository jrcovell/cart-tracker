import { useQuery } from "@tanstack/react-query";
import { getTodaysWeather } from "../../services/apiWeather";

export function useRecentWeather() {
  const {
    isPending,
    data: { data: weather } = {},
    error,
  } = useQuery({
    queryFn: getTodaysWeather,
    queryKey: ["weather"],
  });

  return { isPending, weather, error };
}
