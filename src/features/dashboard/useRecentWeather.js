import { useQuery } from "@tanstack/react-query";
import { getTodaysWeather } from "../../services/apiWeather";

export function useRecentWeather() {
  const {
    isPending,
    data: weather,
    error,
  } = useQuery({
    queryFn: getTodaysWeather,
    queryKey: ["weather"],
  });

  const weatherData = weather?.data;
  return { isPending, weather, weatherData, error };
}
