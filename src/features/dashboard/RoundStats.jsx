import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentCheck,
  HiOutlineListBullet,
  HiOutlineMapPin,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import Stat from "./Stat";
import styled from "styled-components";
import { getToday, getTodayNoTime } from "../../utils/helpers";

const StyledBorder = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-indigo-700);
  border-radius: var(--border-radius-md);
  padding: 1.1rem 0.2rem;
  display: grid;
  flex-direction: row;
  grid-gap: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr 20fr;
  margin-left: 2.1rem;
`;

function RoundStats({
  rounds, //* # of tee times for the day
  timeToday, //* duration of each round
}) {
  //1. get the total number of bookings
  // const numBookings = bookings?.length; // the amount of bookings made depending on the filter range
  //2. get the total number of confirmed rounds
  // const numRounds = rounds?.length;

  const roundsToday = rounds?.filter(
    (round) => round.startDate2 === getTodayNoTime()
  );
  // console.log(roundsToday);
  const scheduledRoundsToday = roundsToday?.filter(
    (round) => round.status === "upcoming"
  );
  const confirmedRoundsToday = roundsToday?.filter(
    (round) => round.status === "checked-in"
  );
  const playingRoundsToday = roundsToday?.filter(
    (round) => round.status === "playing"
  );
  const completedRoundsToday = roundsToday?.filter(
    (round) => round.status === "completed"
  );
  const avgTime = timeToday.reduce((a, b) => a + b, 0) / timeToday.length;

  console.log(timeToday);
  // const numConfirmedRounds = confirmedRounds?.length;
  // const numPlayingRounds = playingRounds?.length;
  // const numCompletedRounds = completedRounds?.length;

  //3. get the average duration of a round
  // const avgTime = time.reduce((a, b) => a + b, 0) / time.length;
  // console.log(avgTime);
  return (
    <StyledBorder>
      <Stat
        title="Scheduled Tee Times"
        color="yellow"
        icon={<HiOutlineListBullet />}
        value={confirmedRoundsToday.length}
      />
      <Stat
        title="Checked In"
        color="green"
        icon={<HiOutlineCheckCircle />}
        value={confirmedRoundsToday.length}
      />
      <Stat
        title="On Course"
        color="indigo"
        icon={<HiOutlineMapPin />}
        value={playingRoundsToday.length}
      />
      <Stat
        title="Completed Rounds"
        color="red"
        icon={<HiOutlineDocumentCheck />}
        value={completedRoundsToday.length}
      />
      <Stat
        title="Average Duration"
        color="teal"
        icon={<HiOutlineClock />}
        value={avgTime.toFixed(2) + " hours"}
      />
    </StyledBorder>
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
