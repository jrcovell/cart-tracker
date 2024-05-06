import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { is } from "date-fns/locale";
import Spinner from "../../ui/Spinner";
import { useRecentRounds } from "./useRecentRounds";
import RoundStats from "./RoundStats";
import SalesChart from "./RoundsChart";
import RoundsChart from "./RoundsChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.3fr; // 4 columns for top stats
  grid-template-rows: auto 34rem auto;
  gap: 1.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending, numDays, error } = useRecentBookings();

  const {
    rounds,
    confirmedRounds,
    playingRounds,
    completedRounds,
    time,
    isPending: isPendingRounds,
    error: errorRounds,
  } = useRecentRounds();

  if (isPending || isPendingRounds) <Spinner />;

  return (
    <StyledDashboardLayout>
      <RoundStats
        bookings={bookings}
        confirmedRounds={confirmedRounds}
        playingRounds={playingRounds}
        completedRounds={completedRounds}
        time={time}
        rounds={rounds}
      />
      <div>Stats</div>
      <DurationChart time={time} />
      <RoundsChart rounds={rounds} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
