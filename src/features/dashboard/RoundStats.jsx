import {
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocument,
  HiOutlineMapPin,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import Stat from "./Stat";

function RoundStats({ bookings, confirmedRounds }) {
  //1. get the total number of bookings
  const numBookings = bookings?.length;
  //2. get the total number of confirmed rounds
  const numConfirmedRounds = confirmedRounds?.length;

  return (
    <>
      <Stat
        title="Bookings Made"
        color="blue"
        icon={<HiOutlineNewspaper />}
        value={numBookings}
      />
      <Stat
        title="Confirmed Rounds"
        color="green"
        icon={<HiOutlineCheckCircle />}
        value={numConfirmedRounds}
      />
      <Stat
        title="On Course"
        color="indigo"
        icon={<HiOutlineMapPin />}
        value={numBookings}
      />
      <Stat
        title="Average Round Duration"
        color="yellow"
        icon={<HiOutlineClock />}
        value={numBookings}
      />
    </>
  );
}

export default RoundStats;
