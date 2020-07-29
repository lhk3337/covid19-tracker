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
import Table from "./Table";
import "./style/App.css";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 36.596958,
    lng: 127.877083,
  });
  const [mapZoom, setMapZoom] = useState(5);
  const [mapCountries, setMapCountries] = useState([]);
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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  // console.log("Country Info", countryInfo); //object 출력
  // console.log(typeof `Country Info ${countryInfo}`); //Country Info [object Object] // template literal retruns a string.
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Corona-Virus 추적 시스템</h1>
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
            total={prettyPrintStat(countryInfo.cases)}
            cases={prettyPrintStat(countryInfo.todayCases)}
          />
          <InfoBox
            title="완치자"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />

          <InfoBox
            title="사망자"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        {/* Map */}
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent className="container">
          <h3>국가별 확진자 리스트</h3>
          <Table countries={tableData} />
          {/* Table */}
          <h3>새로운 확진자 추이</h3>
          <LineGraph />
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
