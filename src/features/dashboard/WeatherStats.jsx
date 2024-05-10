import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Stat from "./Stat";
import { HiOutlineSun } from "react-icons/hi2";
import {
  WiCloud,
  WiDayCloudy,
  WiDaySunny,
  WiHumidity,
  WiRain,
  WiStrongWind,
  WiThermometer,
  WiWindBeaufort0,
  WiWindy,
} from "react-icons/wi";

const StyledWeather = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-indigo-700);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function WeatherStats({ weather, isPending }) {
  if (!weather) return null;
  const Temperature = weather.main.temp.toFixed(1) + "°F";
  const Description =
    weather.weather[0].description.charAt(0).toUpperCase() +
    weather.weather[0].description.slice(1);
  const icon =
    Description === "clear sky" ? (
      <WiDaySunny />
    ) : Description === "few clouds" ? (
      <WiDayCloudy />
    ) : Description === "rain" ||
      Description === "moderate rain" ||
      Description === "light rain" ? (
      <WiRain />
    ) : (
      <WiCloud />
    );

  return (
    <StyledWeather>
      <Row type="horizontal">
        <Heading as="h2">Current Weather</Heading>
      </Row>
      {!isPending ? (
        <>
          <Stat
            title="Current Conditions:"
            color="silver"
            icon={icon}
            value={Description}
          />

          <Stat
            title="Temperature:"
            color="orange"
            icon={<WiThermometer />}
            value={Temperature}
          />
          <Stat
            title="Wind Speed:"
            color="pink"
            icon={<WiStrongWind />}
            value={weather.wind.speed + " mph"}
          />
        </>
      ) : (
        <NoActivity>No weather data</NoActivity>
      )}
    </StyledWeather>
  );
}

export default WeatherStats;
