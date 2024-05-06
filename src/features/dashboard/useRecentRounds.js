import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {
  getRoundsAfterDate,
  getRoundsSelectedDate,
} from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { getToday, getYesterday, subtractDates } from "../../utils/helpers";
import { get } from "react-hook-form";

export function useRecentRounds() {
  const [searchParams] = useSearchParams();

  const currentDate = !searchParams.get("day") ? 0 : searchParams.get("day");

  const {
    isPending,
    data: rounds,
    error,
  } = useQuery({
    queryFn: () => getRoundsSelectedDate(),
    queryKey: ["rounds"], //"rounds" = query name, "today" = query key
  });

  // console.log(rounds);

  const confirmedRounds = rounds?.filter(
    (round) => round.status === "checked-in"
  );
  const playingRounds = rounds?.filter((round) => round.status === "playing");
  const completedRounds = rounds?.filter(
    (round) => round.status === "completed"
  );

  //*
  // let timeex = "10:05:29";

  function timeStringToFloat(time) {
    //remove the seconds
    let hoursMinutes = time.split(":").slice(0, 2);
    // console.log(hoursMinutes); // [ '10', '05' ]
    let hours = parseInt(hoursMinutes[0]); // 10 is the radix radix is the base of the numeral system
    // console.log(hours); // 10
    let minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0; //
    // console.log(minutes); // 5
    return parseFloat(hours + "." + minutes);
  }
  //*

  const startTime = rounds?.map((round) => timeStringToFloat(round.startTime));
  const endTime = rounds?.map((round) => round.endTime);
  const time = rounds?.map(
    (round) =>
      timeStringToFloat(round.endTime) - timeStringToFloat(round.startTime)
  );

  return {
    isPending,
    rounds,
    confirmedRounds,
    playingRounds,
    completedRounds,
    currentDate,
    time,
    error,
  };
}

/*
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 0 : searchParams.get("last"); // default to 0 if no search param (todays date)

  //subDays is a date-fns function that subtracts days from a given date
  // queryDate is a string that represents the date of the last numDays
  const queryDate = subDays(new Date(), numDays).toISOString();
  console.log(queryDate);

  const {
    isPending,
    data: rounds,
    error,
  } = useQuery({
    queryFn: () => getRoundsAfterDate(queryDate),
    queryKey: ["rounds", `last-${numDays}`],
  });
  console.log(getToday({ end: true }));
  console.log(rounds);
  //!double check this logic later!!!
  // if we want to show only confirmed rounds
  const confirmedRounds = rounds?.filter(
    (round) => round.status === "checked-in"
  );
  const playingRounds = rounds?.filter((round) => round.status === "playing");

  // const convertedTime = rounds[0]?.startDate.toISOString();
  // console.log(convertedTime);
  // const roundIds = rounds?.map((round) => round.id);
  // const totalRoundIds = rounds?.reduce((acc, round) => {
  //   return acc + round.id;
  // }, 0);

  return {
    isPending,
    rounds,
    confirmedRounds,
    playingRounds,

    error,
  };
}
*/