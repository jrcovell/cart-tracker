import { useQuery } from "@tanstack/react-query";
import { getGolfers } from "../../services/apiGolfers";

export function useGolfers() {
  const {
    isPending,
    data: golfers,
    error,
  } = useQuery({
    queryKey: ["golfers"],
    queryFn: getGolfers,
  });

  return { isPending, golfers, error };
}
