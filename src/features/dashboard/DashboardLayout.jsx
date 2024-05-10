import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { is } from "date-fns/locale";
import Spinner from "../../ui/Spinner";
import { useRecentRounds } from "./useRecentRounds";
import RoundStats from "./RoundStats";
import SalesChart from "./RoundsChart";
import RoundsChart from "./RoundsChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { useRecentWeather } from "./useRecentWeather";
import WeatherStats from "./WeatherStats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.8fr; // 4 columns for top stats
  grid-template-rows: auto auto auto;
  gap: 1.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending, numDays, error } = useRecentBookings();
  const {
    weather,
    isPending: isPendingWeather,
    error: errorWeather,
  } = useRecentWeather();
  const {
    rounds,
    confirmedRounds,
    playingRounds,
    completedRounds,
    time,
    isPending: isPendingRounds,
    error: errorRounds,
  } = useRecentRounds();

  if (isPending || isPendingRounds || isPendingWeather) <Spinner />;
  if (error || errorRounds || errorWeather) return <div>{error}</div>;

  console.log(weather);
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
      <WeatherStats weather={weather} isPending={isPendingWeather} />
      <DurationChart time={time} />
      <RoundsChart rounds={rounds} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
