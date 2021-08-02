import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { set } from "./features/location/locationSlice";
import styled from "styled-components";
import Hour from "./components/Hour";
import Main from "./components/Main";
import Day from "./components/Day";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const API_KEY = "a220ba9caf6b6389b52b38bfc707781a";

  const [locationName, setLocationName] = useState("");
  const [weather, setWeather] = useState({
    current: { weather: [] },
    daily: [],
    hourly: [],
  });

  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    //Get Location

    const setPosition = (position) => {
      dispatch(
        set({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      );
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, [dispatch]);

  useEffect(() => {
    //Make api call after getting location
    const getWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,alerts&units=${location.units}&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
    };
    const getName = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
      );
      const data = await response.json();
      setLocationName(data.name);
    };

    getWeather();
    getName();
  }, [location]);

  return (
    <Container>
      <Navbar locationName={locationName} />
      <Main weather={weather} />
      <Hour weather={weather} />
      <Day weather={weather} />
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-image: url("./images/Sun2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 80px;
`;
