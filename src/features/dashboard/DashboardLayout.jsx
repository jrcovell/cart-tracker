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
<<<<<<< HEAD
import DashboardFilter from "./DashboardFilter";
=======
import { useRecentWeather } from "./useRecentWeather";
import WeatherStats from "./WeatherStats";
>>>>>>> 7b3307d7dc0c86ff1719868d8161289ce55979ce
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
<<<<<<< HEAD
    <StyledDashboardLayout>
      <RoundStats
        bookings={bookings}
        confirmedRounds={confirmedRounds}
        playingRounds={playingRounds}
        completedRounds={completedRounds}
        time={time}
        rounds={rounds}
      />
      <DashboardFilter />

      <TodayActivity />
      <DurationChart time={time} />
      <RoundsChart rounds={rounds} numDays={numDays} />
    </StyledDashboardLayout>
=======
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
>>>>>>> 7b3307d7dc0c86ff1719868d8161289ce55979ce
  );
}
export default DashboardLayout;
