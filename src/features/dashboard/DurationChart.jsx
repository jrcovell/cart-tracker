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
    duration: "< 3 hours",
    value: 2,
    color: "#15803d",
  },
  {
    duration: "3.25 hours",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "3.5 hours",
    value: 2,
    color: "#4d7c0f",
  },
  {
    duration: "3.75 hours",
    value: 2,
    color: "#7e22ce",
  },
  {
    duration: "4 hours",
    value: 3,
    color: "##1d4ed8",
  },
  {
    duration: "4.25 hours",
    value: 4,
    color: "#eab308",
  },
  {
    duration: "4.5+ hours",
    value: 1,
    color: "#b91c1c",
  },
];

const startDataLight2 = [
  {
    // duration: "< 3 hours",
    value: 0,
    color: "#15803d",
  },
  {
    // duration: "3.25 hours",
    value: 1,
    color: "#1d4ed8",
  },
  {
    // duration: "3.5 hours",
    value: 1,
    color: "#4d7c0f",
  },
  {
    // duration: "3.75 hours",
    value: 5,
    color: "#7e22ce",
  },
  {
    // duration: "4 hours",
    value: 2,
    color: "##1d4ed8",
  },
  {
    // duration: "4.25 hours",
    value: 2,
    color: "#eab308",
  },
  {
    // duration: "4.5+ hours",
    value: 3,
    color: "#b91c1c",
  },
];

const startDataDark = [
  {
    duration: "less than 3 hours",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "3.25 hours",
    value: 0,
    color: "#1d4ed8",
  },

  {
    duration: "3-4 hours",
    value: 0,
    color: "##1d4ed8",
  },
  {
    duration: "4+ hours",
    value: 0,
    color: "#b91c1c",
  },
];

function prepareData(startData, time) {
  // if (!time) return startData; //!time is true when time is null or undefined
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅
  function incArrayValue(arr, field) {
    console.log(arr);
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = time
    ?.reduce((arr, cur) => {
      const num = cur;
      console.log(num);
      if (num < 3) return incArrayValue(arr, "less than 3 hours");
      if (num >= 3 && num < 4) return incArrayValue(arr, "3-4 hours");
      if (num >= 4) return incArrayValue(arr, "4+ hours");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0); // remove objects with value 0
  console.log(data);
  return data;
}

// increases the value of the object in the array that has the same duration as the current stay by 1
/*
  const data = time
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
  */

function DurationChart({ time }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, time);
  console.log(data);

  return (
    <>
      <ChartBox>
        <Heading as="h2">Round Duration</Heading>

        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={startDataLight}
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
              {startDataLight.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>

            <Legend
              payload={startDataLight.map((entry) => ({
                value: entry.duration,
                type: "square",
                color: entry.color,
              }))}
              horizontalAlign="center"
              align="center"
              width="100%"
              layout="horizontal"
              wrapperStyle={{ fontSize: "2.0rem" }}
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
