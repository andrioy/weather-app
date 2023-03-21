import { Typography, Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";

const WeeklyWeather = ({ defaultCity }) => {
  const [weeklyWeather, setWeeklyWeather] = useState();

  const days = [];

  const weathercode = {
    0: "Clear sky",
    1: "Mainly clear, partly cloudy, and overcast",
    2: "Mainly clear, partly cloudy, and overcast",
    3: "Mainly clear, partly cloudy, and overcast",
    45: "Fog and depositing rime fog",
    48: "Fog and depositing rime fog",
    51: "Drizzle: Light, moderate, and dense intensity",
    53: "Drizzle: Light, moderate, and dense intensity",
    55: "Drizzle: Light, moderate, and dense intensity",
    56: "Freezing Drizzle: Light and dense intensity",
    57: "Freezing Drizzle: Light and dense intensity",
    61: "Rain: Slight, moderate and heavy intensity",
    63: "Rain: Slight, moderate and heavy intensity",
    65: "Rain: Slight, moderate and heavy intensity",
    66: "Freezing Rain: Light and heavy intensity",
    67: "Freezing Rain: Light and heavy intensity",
    71: "Snow fall: Slight, moderate, and heavy intensity",
    73: "Snow fall: Slight, moderate, and heavy intensity",
    75: "Snow fall: Slight, moderate, and heavy intensity",
    77: "Snow grains",
    80: "Rain showers: Slight, moderate, and violent",
    81: "Rain showers: Slight, moderate, and violent",
    82: "Rain showers: Slight, moderate, and violent",
    85: "Snow showers slight and heavy",
    86: "Snow showers slight and heavy",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight and heavy hail",
    99: "Thunderstorm with slight and heavy hail",
  };

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${defaultCity.latitude}&longitude=${defaultCity.longitude}&daily=temperature_2m_min,temperature_2m_max,windspeed_10m_max,weathercode,sunrise,sunset&timezone=auto`
    )
      .then((response) => response.json())
      .then((json) => setWeeklyWeather(json));
  }, []);
  if (weeklyWeather?.daily) {
    const {
      time,
      sunrise,
      sunset,
      temperature_2m_max,
      temperature_2m_min,
      weathercode,
      windspeed_10m_max,
    } = weeklyWeather.daily;

    for (let i = 0; i < time.length; i++) {
      const dailyForecastObj = {
        date: time[i],
        sunrise: sunrise[i],
        sunset: sunset[i],
        maxTemp: temperature_2m_max[i],
        minTemp: temperature_2m_min[i],
        weatherCode: weathercode[i],
        winSpeed: windspeed_10m_max[i],
      };
      days.push(dailyForecastObj);
    }
  }

  return (
    <>
      {days?.map((day, i) => (
        <Box key={i} sx={{ backgroundColor: "#55B08A", margin: "1px" }}>
          <Typography variant="h4">{day.date}</Typography>
          <Typography variant="h5">
            {day.minTemp} C ~ {day.maxTemp} C
          </Typography>
          <Typography variant="h5">{day.winSpeed}</Typography>
          <Typography variant="h5">{weathercode[day.weatherCode]}</Typography>
        </Box>
      ))}
    </>
  );
};

export default WeeklyWeather;
