import styled from "styled-components";
import DashboardBox from "./DashboardBox";

const StyledWeatherChart = styled(DashboardBox)`
  grid-column: 1 / -1;
`;

function WeatherChart() {
  return <StyledWeatherChart>Weather Chart</StyledWeatherChart>;
}

export default WeatherChart;
