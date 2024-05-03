import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import Stat from "./Stat";

function RoundStats({
  bookings,
  rounds,

  confirmedRounds,
  playingRounds,
}) {
  //1. get the total number of bookings
  const numBookings = bookings?.length; // the amount of bookings made depending on the filter range
  //2. get the total number of confirmed rounds
  const numConfirmedRounds = confirmedRounds?.length;
  const numPlayingRounds = playingRounds?.length;

  return (
    <>
      <Stat
        title="Total Tee Times"
        color="blue"
        icon={<HiOutlineNewspaper />}
        value={numBookings}
      />
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
        value={numConfirmedRounds}
      />
      <Stat
        title="Average Round Duration"
        color="yellow"
        icon={<HiOutlineClock />}
        value="4h 30m"
      />
    </>
  );
}

export default RoundStats;
