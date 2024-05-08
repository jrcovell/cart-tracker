import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import Stat from "./Stat";

function RoundStats({
  bookings,
  rounds, //* # of tee times for the day
  confirmedRounds,
  playingRounds,
  completedRounds,
  time,
}) {
  // console.log(time);
  //1. get the total number of bookings
  const numBookings = bookings?.length; // the amount of bookings made depending on the filter range
  //2. get the total number of confirmed rounds
  const numRounds = rounds?.length;
  const numConfirmedRounds = confirmedRounds?.length;
  const numPlayingRounds = playingRounds?.length;
  const numCompletedRounds = completedRounds?.length;

  //3. get the average duration of a round
  // const avgTime = time.reduce((a, b) => a + b, 0) / time.length;
  // console.log(avgTime);
  return (
    <>
      <Stat
        title="Checked In"
        color="green"
        icon={<HiOutlineCheckCircle />}
        value={numConfirmedRounds}
      />
      <Stat
        title="On Course"
        color="indigo"
        icon={<HiOutlineMapPin />}
        value={numPlayingRounds}
      />
      <Stat
        title="Completed Rounds"
        color="red"
        icon={<HiOutlineCheckCircle />}
        value={numCompletedRounds}
      />
      <Stat
        title="Average Duration (hrs/mins)"
        color="yellow"
        icon={<HiOutlineClock />}
        // value={avgTime}
      />
    </>
  );
}

export default RoundStats;

/*
   <Stat
        title="Total Tee Times"
        color="blue"
        icon={<HiOutlineNewspaper />}
        value={numRounds}
      />
      */
