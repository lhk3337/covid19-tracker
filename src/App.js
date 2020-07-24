import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  // STATE = How to write a variable in REACT <<<<<<<<

  // https://disease.sh/v3/covid-19/countries

  // USEEFFECT = Runs a piece of code

  // based on a given condition

  useEffect(() => {
    fetch("http://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    // The code inside here will run once
    // When the component loads and not again
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // S. Korea, United States, United Kingdom
            value: country.countryInfo.iso2, //KR, USA, UK
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    // 리스트 클릭시 맨 위 text로 출력 KR, USA, UK--> S. korea, United state, United kingdom
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  console.log("Country Info", countryInfo); //object 출력
  // console.log(typeof `Country Info ${countryInfo}`); //Country Info [object Object] // template literal retruns a string.

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 현황</h1>
          <FormControl className="app__dropdown">
            {/* Title + Select input drowdown field */}
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* //다시 확인/ */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Loop through all the countries
            and show a drop down
            list of the options */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="확진자"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            title="완치자"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox title="치료중" total={countryInfo.active} />
          <InfoBox
            title="사망자"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
