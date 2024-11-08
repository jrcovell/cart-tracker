import { useSearchParams } from "react-router-dom";
import { getRoundsSelectedDate2 } from "../../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { subDays } from "date-fns";

export function useRecentRounds() {
  const [searchParams] = useSearchParams();
  const currentDate = !searchParams.get("day") ? 30 : searchParams.get("day");
  const queryDate = subDays(new Date(), currentDate)
    .toISOString()
    .split("T")[0];
  // console.log(currentDate); //
  // console.log(queryDate); //

  const { isPending, data: rounds } = useQuery({
    // queryFn: getRoundsSelectedDate2,
    queryFn: () => getRoundsSelectedDate2(queryDate),
    queryKey: ["rounds", `day-${currentDate}`],
  });

  const confirmedRounds = rounds?.filter(
    (round) => round.status === "checked-in"
  );
  const playingRounds = rounds?.filter((round) => round.status === "playing");
  const completedRounds = rounds?.filter(
    (round) => round.status === "completed"
  );

  // console.log(rounds);

  function timeStringToFloat(time) {
    // console.log(time); // 10:05:00
    //remove the seconds
    let hoursMinutes = time?.split(":").slice(0, 2); // error when checking in a round (end time is null)
    // console.log(hoursMinutes); // [ '10', '05' ]
    let hours = parseInt(hoursMinutes[0]); // 10 is the radix radix is the base of the numeral system
    // console.log(hours); // 10
    let minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0; //
    // console.log(minutes); // 5
    return parseFloat(hours + "." + minutes);
  }
  // const startTime = rounds?.map((round) => timeStringToFloat(round.startTime));
  // const endTime = rounds?.map((round) => round.endTime);
  const timeToday = rounds
    ?.filter(
      (round) => round.startDate2 === new Date().toISOString().slice(0, 10)
    )
    .map((round) =>
      round?.endTime === null
        ? null //* guard against null end time (when checking in a round, redirects to dashboard, end time is null on newly checked in round)
        : timeStringToFloat(round?.endTime) -
          timeStringToFloat(round?.startTime)
    );

  const time = rounds?.map(
    (round) =>
      round?.endTime === null
        ? null //* guard against null end time (when checking in a round, redirects to dashboard, end time is null on newly checked in round)
        : timeStringToFloat(round?.endTime) -
          timeStringToFloat(round?.startTime)
    /*
     (round?.endTime === null) {
        return 
      }
      timeStringToFloat(round?.endTime) - timeStringToFloat(round?.startTime)
      */
  );

  // console.log(getToday());
  // console.log(getTodayNoTime());
  // console.log(time);
  // console.log(timeToday);

  //*

  return {
    isPending,
    rounds,
    confirmedRounds,
    playingRounds,
    completedRounds,
    currentDate,
    time,
    timeToday,
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
