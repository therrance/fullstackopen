import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filterValue, handleFilter }) => (
  <div>
    find countries: <input onChange={handleFilter} value={filterValue} />
  </div>
);

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({
    current: {
      temperature: "",
      weather_icons: [""],
      wind_speed: "",
      wind_dir: ""
    }
  });

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=11179f1b387d34fd7cc1ce06b1b27c73&query=%22${city}%22`
      )
      .then(response => {
        setWeather(response.data);
      });
  }, []);

  return (
    <div>
      <h4>Weather in {city}</h4>
      <p>
        <strong>Temperature:</strong> {weather.current.temperature} Celsium
      </p>
      <img
        src={weather.current.weather_icons[0]}
        alt={`${city} weather`}
        width="100"
      />
      <p>
        <strong>Wind:</strong> {weather.current.wind_speed} kph direction{" "}
        {weather.current.wind_dir}
      </p>
    </div>
  );
};

const CountryCard = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <h4>Languages</h4>
    <ul>
      {country.languages.map(language => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt={`${country.demonym} flag`} width="200" />
    <Weather city={country.capital} />
  </div>
);

const CountriesList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div>
      {countries.map(country => (
        <p key={country.name}>
          {country.name}{" "}
          <button
            onClick={() => {
              setSelectedCountry(country.name);
            }}
          >
            show
          </button>
        </p>
      ))}
      {selectedCountry && (
        <CountryCard
          country={
            countries.filter(country => country.name === selectedCountry)[0]
          }
        />
      )}
    </div>
  );
};

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <CountryCard country={countries[0]} />;
  } else {
    return <CountriesList countries={countries} />;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow = filter.length
    ? countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const handleFilter = event => setFilter(event.target.value);

  return (
    <div>
      <Filter filterValue={filter} handleFilter={handleFilter} />
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
