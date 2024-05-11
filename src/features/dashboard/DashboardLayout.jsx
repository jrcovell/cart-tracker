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
import DashboardFilter from "./DashboardFilter";
import { useRecentWeather } from "./useRecentWeather";
import WeatherStats from "./WeatherStats";
import Row from "../../ui/Row";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; // 4 columns for top stats
  grid-template-rows: auto auto auto;
  gap: 1.4rem;
`;
const StyledChartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
`;

function DashboardLayout() {
  const { bookings, isPending, numDays, error } = useRecentBookings();
  const {
    weather,
    weatherData,
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
  console.log(weatherData);
  console.log(weather);
  return (
    <>
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
      </StyledDashboardLayout>
      <StyledChartLayout>
        <RoundsChart rounds={rounds} numDays={numDays} />
        <DurationChart time={time} />
      </StyledChartLayout>
    </>
  );
}
export default DashboardLayout;
