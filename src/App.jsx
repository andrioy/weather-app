import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  styled,
  Autocomplete,
} from "@mui/material";

import "./App.css";
import CurrentTemperature from "./components/CurrentTemperature/CurrentTemperature";
import WeeklyWeather from "./components/WeeklyWeather/WeeklyWeather";

const MainContainer = styled(Box)(() => ({
  backgroundColor: "#7EB09B",
  paddingLeft: "100px",
  paddingRight: "100px",
}));

const WeatherContainer = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
}));

const Column = styled(Box)(() => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignContent: "center",
  padding: "10px",
}));

function App() {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const defaultCity = {
    label: "Vratsa, Bulgaria",
    latitude: "43.25",
    longitude: "23.625",
  };

  const [selectedCity, setSelectedCity] = useState(defaultCity);

  const handleOnSearchChange = async () => {
    const { results } = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=5`
    )
      .then((response) => response.json())
      .then((json) => json);

    setCities(results);
  };

  useEffect(() => {
    handleOnSearchChange();
  }, [searchQuery]);

  const autocompleteOptions = cities?.map((e) => {
    return {
      label: e.name + ", " + e.country,
      id: e.id,
      latitude: e.latitude,
      longitude: e.longitude,
    };
  });

  return (
    <MainContainer>
      <Typography variant="h1">Weather Station</Typography>

      <WeatherContainer>
        <Column>
          <WeeklyWeather defaultCity={selectedCity} />
        </Column>
        <Column>
          <Autocomplete
            disablePortal
            options={autocompleteOptions || []}
            onChange={(e, value) => setSelectedCity(value)}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            onInputChange={(e) => {
              setSearchQuery(e?.target?.value);
            }}
            sx={{
              width: "100%",
            }}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search city" />
            )}
          />
          <CurrentTemperature searchCity={selectedCity} />
        </Column>
      </WeatherContainer>
    </MainContainer>
  );
}

export default App;
