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

const StyledRoundsChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalRounds: 50, lastYearRounds: 65 },
  { label: "Jan 10", totalRounds: 75, lastYearRounds: 26 },
  { label: "Jan 11", totalRounds: 66, lastYearRounds: 0 },
  { label: "Jan 12", totalRounds: 85, lastYearRounds: 65 },
  { label: "Jan 13", totalRounds: 22, lastYearRounds: 65 },
];

function RoundsChart({ rounds, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays), //subDays is a date-fns function that subtracts days from a given date
    end: new Date(), // today
  });

  /*
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalRounds: rounds
        .filter((round) =>
          // isSameDay is a date-fns function that checks if two dates are the same day
          isSameDay(date, new Date(round.created_at))
        )
        // add up the number of rounds for selected date
        .reduce((acc, round) => acc + round.rounds, 0),
    };
  });
*/

  // console.log(numDays);
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
      <Heading as="h2">
        Total Rounds from {format(allDates.at(0), "MMM dd yyyy")} to{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={fakeData}>
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
          <Area
            dataKey="lastYearRounds"
            type="monotone"
            stroke={colors.lastYearRounds.stroke}
            fill={colors.lastYearRounds.fill}
            strokeWidth={4}
            name="Previous Year Rounds"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledRoundsChart>
  );
}

export default RoundsChart;
