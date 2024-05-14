import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  eachDayOfIntervalNoTime,
  formatDate,
  getDateNoTime,
  getTodayNoTime,
  isSameDayNoTime,
  subDaysNoTime,
} from "../../utils/helpers";

const StyledRoundsChart = styled(DashboardBox)`
  grid-column: 1 / span 1;
  border: 1px solid var(--color-indigo-700);
  border-radius: var(--border-radius-md);

  /* width: 75%; */

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalRounds: 50 },
  { label: "Jan 10", totalRounds: 75 },
  { label: "Jan 11", totalRounds: 66 },
  { label: "Jan 12", totalRounds: 85 },
  { label: "Jan 13", totalRounds: 22 },
];

function RoundsChart({ rounds, numDays, allDatesNoTime }) {
  const { isDarkMode } = useDarkMode();

  // console.log(isSameDayNoTime("2024-05-05", "2024-05-05"));
  // console.log(isSameDay("2024-05-05", "2024-05-05"));
  // console.log(allDatesNoTime);
  // console.log(rounds);
  // console.log(allDatesNoTime[0]);
  // console.log(new Date(rounds[0].startDate2).toISOString().slice(0, 10));
  // console.log(new Date(rounds[1].startDate2).toISOString().slice(0, 10));
  const data = allDatesNoTime?.map((date) => {
    // console.log(date);
    return {
      // format to "MMM dd"
      label: formatDate(date),
      // add up the number of rounds for selected date without reduce
      totalRounds: rounds.reduce((acc, round) => {
        // let totalRounds = 1;
        if (
          // if the date is the same as the date of the round
          isSameDayNoTime(
            date,
            new Date(round.startDate2).toISOString().slice(0, 10)
          )
        ) {
          // add the number of rounds for that date
          // console.log(round);
          // need to keep a column for each round for this to work (numRounds = 1) better way to do this?
          return acc + 1;
        }
        return acc;
      }, 0),
    };
  });

  // console.log(data);

  // console.log(numDays); // 7 30 90
  // console.log(allDates);

  const colors = isDarkMode
    ? {
        totalRounds: { stroke: "#4f46e5", fill: "#4f46e5" },
        lastYearRounds: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalRounds: { stroke: "#4f46e5", fill: "#c7d2fe" },
        lastYearRounds: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#111827",
        background: "#fff",
      };

  return (
    <StyledRoundsChart>
      <Heading as="h2">Number of Rounds</Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit=""
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalRounds"
            type="monotone"
            stroke={colors.totalRounds.stroke}
            fill={colors.totalRounds.fill}
            strokeWidth={4}
            name="Total Rounds"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledRoundsChart>
  );
}

export default RoundsChart;

// const allDates = eachDayOfInterval({
//   start: subDays(new Date(), numDays), //subDays is a date-fns function that subtracts days from a given date
//   end: new Date(), // today
// });

// console.log(getTodayNoTime()); // 2024-05-12
// console.log(subDaysNoTime(getTodayNoTime(), 10)); // 2024-05-02
// console.log(allDatesNoTime);
// console.log(rounds);
//

/*
  const data = allDates?.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalRounds: rounds
        .filter((round) =>
          // isSameDay is a date-fns function that checks if two dates are the same day
          isSameDay(date, new Date(round.startDate))
        )
        // add up the number of rounds for selected date
        .reduce((acc, round) => acc + round.rounds, 0),
    };
  });
*/
