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

    if(error) {
      console.error(error);

      throw new Error("Weather could not get loaded");
    },
  });

  const weatherData = weather?.data;
  console.log(weatherData);
  return { isPending, weather, weatherData, error };
}
