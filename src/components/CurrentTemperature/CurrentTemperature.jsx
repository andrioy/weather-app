import { useState, useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";

function CurrentTemperature({ searchCity }) {
  const [currentWeather, setCurrectWeather] = useState();

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
      `https://api.open-meteo.com/v1/forecast?latitude=${searchCity?.latitude}&longitude=${searchCity?.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
    )
      .then((response) => response.json())
      .then((json) => setCurrectWeather(json));
  }, [searchCity]);

  return (
    <Box sx={{ marginTop: "200px" }}>
      <Typography variant="h2">City: {searchCity?.label}</Typography>
      <Typography variant="h3">
        Temperature:
        {currentWeather?.current_weather?.temperature}
      </Typography>
      <Typography>
        Wind direction: {currentWeather?.current_weather?.winddirection}
      </Typography>
      <Typography>
        Wind speed: {currentWeather?.current_weather?.windspeed}
      </Typography>
      <Typography>
        {weathercode[currentWeather?.current_weather?.weathercode]}
      </Typography>
    </Box>
  );
}

export default CurrentTemperature;
