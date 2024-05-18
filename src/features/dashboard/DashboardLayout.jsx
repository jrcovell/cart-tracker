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
import Heading from "../../ui/Heading";
import { format } from "date-fns";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import {
  eachDayOfIntervalNoTime,
  getTodayNoTime,
  subDaysNoTime,
} from "../../utils/helpers";

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
  const { bookings, numDays, isPending, error } = useRecentBookings();
  const {
    weather,
    weatherData,
    isPending: isPendingWeather,
    error: errorWeather,
  } = useRecentWeather();
  const {
    rounds,
    time,
    timeToday,
    isPending: isPendingRounds,
    error: errorRounds,
  } = useRecentRounds();

  const allDatesNoTime = eachDayOfIntervalNoTime({
    //
    start: subDaysNoTime(getTodayNoTime(), numDays), //subDays is a date-fns function that subtracts days from a given date
    end: getTodayNoTime(), // today
  });

  // console.log(getTodayNoTime());
  // console.log(allDatesNoTime);

  if (isPending || isPendingRounds || isPendingWeather) return <Spinner />;

  if (error || errorRounds || errorWeather) return <div>{error}</div>;
  // console.log(weatherData);
  // console.log(weather);
  // console.log(rounds);

  return (
    <>
      <StyledDashboardLayout>
        <RoundStats bookings={bookings} timeToday={timeToday} rounds={rounds} />
        <WeatherStats weather={weather} isPending={isPendingWeather} />
      </StyledDashboardLayout>

      <Row type="horizontal">
        <Heading as="h2">
          Round Stats {format(allDatesNoTime.at(1), "MMM dd")} -{" "}
          {format(getTodayNoTime(), "MMM dd")}
        </Heading>
        <DashboardFilter />
      </Row>
      <StyledChartLayout>
        <RoundsChart
          rounds={rounds}
          numDays={numDays}
          allDatesNoTime={allDatesNoTime}
        />
        <DurationChart time={time} />
      </StyledChartLayout>
    </>
  );
}
export default DashboardLayout;
