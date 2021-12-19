import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Country = ({ country, languages, }) => {
    const [countryWeatherData, setCountryWeatherData] = useState([]);

    const countryName = country.name.common;
    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        if (countryName) {
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${API_KEY}`)
            .then(response => {
                setCountryWeatherData(response.data);
            });
        }
    }, [countryName]);

    let country_name;
    let temp;
    let weatherIcon;
    let iconURL;
    let windSpeed;

    if (countryWeatherData.length !== 0) {
        country_name = countryWeatherData.name;
        temp = Math.floor(Number(countryWeatherData.main.temp) - 273.15);
        weatherIcon = countryWeatherData.weather[0].icon;
        iconURL = `http://openweathermap.org/img/w/${weatherIcon}.png`;
        windSpeed = countryWeatherData.wind.speed;
    }

    return (
        <div className='country-card'>
            <h1>{country.name.common}</h1>
            <br />
            <p>capital: {country.capital[0]}</p>
            <p>population: {country.population}</p>
            <h3>Spoken languages</h3>
            <ul>
                {languages.map((lang, i) => {
                return (
                    <li key={i}>{lang}</li>
                );
                })}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
            <h3>Weather in {country_name}</h3>
            <p>temperature: {temp} celsius</p>
            <img style={{
                width: 100,
                height: 100
            }} src={iconURL} alt='weather-icon' />
            <p>wind: {windSpeed} mph</p>
        </div>
    );
}

Country.propTypes = {
    country: PropTypes.object
};

export default Country;