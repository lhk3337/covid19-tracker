import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  // STATE = How to write a variable in REACT <<<<<<<<

  // https://disease.sh/v3/covid-19/countries

  // USEEFFECT = Runs a piece ofcode

  // based on a given condition

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
    console.log(countryCode);
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
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
          <InfoBox title="누적확진자" cases={123} total={3232} />
          <InfoBox title="완치자" cases={11} total={2222} />
          <InfoBox title="사망자" cases={41} total={4000} />
          {/* InfoBoxs title="Coronavirus cases"*/}
          {/* InfoBoxs title="Coronavirus recoveries"*/}
          {/* InfoBoxs */}
        </div>

        {/* Table */}
        {/* Graph */}

        {/* Map */}
        <Map />
      </div>
    </div>
  );
}

export default App;
