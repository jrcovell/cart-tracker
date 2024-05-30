import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { HiClock, HiOutlineClock } from "react-icons/hi2";
import { useDarkMode } from "../../context/DarkModeContext";
import { startOfDay } from "date-fns";

const ChartBox = styled.div`
  /* Box */

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-indigo-100);
  border-radius: var(--border-radius-md);
  padding: 3rem 2rem;

  /* grid-column: 1 / span 1; */

  /* & > *:first-child {
    margin-bottom: 1.6rem;
  } */

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;
/*
const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 3,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 5,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 4,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 7,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 2,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 1,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];
// */
const startDataLight = [
  {
    duration: "<3 hours",
    value: 0,
    color: "#15803c63",
  },
  {
    duration: "<3.25 hours",
    value: 0,
    color: "#15803cf4",
  },
  {
    duration: "<3.5 hours",
    value: 0,
    color: "#f4ec00",
  },
  {
    duration: "<3.75 hours",
    value: 0,
    color: "#ce7222",
  },
  {
    duration: "<4 hours",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "<4.25 hours",
    value: 0,
    color: "#e74949",
  },
  {
    duration: "+4.25 hours",
    value: 0,
    color: "#b91c1c",
  },
];

//* maybe update the colors to match the theme (change text color to white?)
const startDataDark = [
  {
    duration: "<3 hours",
    value: 0,
    color: "#15803c63",
  },
  {
    duration: "<3.25 hours",
    value: 0,
    color: "#15803cf4",
  },
  {
    duration: "<3.5 hours",
    value: 0,
    color: "#f4ec00",
  },
  {
    duration: "<3.75 hours",
    value: 0,
    color: "#ce7222",
  },
  {
    duration: "<4 hours",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "<4.25 hours",
    value: 0,
    color: "#e74949",
  },
  {
    duration: "+4.25 hours",
    value: 0,
    color: "#b91c1c",
  },
];

function prepareData(startData, time) {
  // if (!time) return startData; //!time is true when time is null or undefined
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅
  function incArrayValue(arr, field) {
    // console.log(arr);
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = time
    ?.reduce((arr, cur) => {
      const num = cur;

      if (num < 3) return incArrayValue(arr, "<3 hours");
      if (num <= 3.25) return incArrayValue(arr, "<3.25 hours");
      if (num <= 3.5) return incArrayValue(arr, "<3.5 hours");
      if (num <= 3.75) return incArrayValue(arr, "<3.75 hours");
      if (num <= 4) return incArrayValue(arr, "<4 hours");
      if (num <= 4.25) return incArrayValue(arr, "<4.25 hours");
      if (num > 4.25) return incArrayValue(arr, "+4.25 hours");

      return arr;
    }, startData)
    .filter((obj) => obj.value > 0); // remove objects with value 0
  // console.log(data);
  return data;
}

function DurationChart({ time }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, time);
  // console.log(time);
  // console.log(data);

  return (
    <>
      <ChartBox>
        <Heading as="h2">Round Duration</Heading>

        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={data}
              label
              nameKey="duration" // nameKey is the key in the data object that will be used as the name of the slice
              dataKey="value" // dataKey is the key in the data object that will be used as the value of the slice
              // startAngle={180}
              // endAngle={0}
              innerRadius={50}
              outerRadius={90}
              cx="50%"
              cy="50%"

              // paddingAngle={9}
            >
              {data.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>

            <Legend
              payload={data.map((entry) => ({
                value: entry.duration,
                type: "square",
                color: entry.color,
              }))}
              horizontalAlign="center"
              align="center"
              width="100%"
              layout="horizontal"
              wrapperStyle={{ fontSize: "1.8rem" }}
              iconSize={12}
              iconType="square"
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartBox>
    </>
  );
}

export default DurationChart;
