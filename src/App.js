import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Countries from './components/Countries';
import Country from './components/Country';
import Message from './components/Message';
import Modal from './components/Modal';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState([]);
  const [inputText, setInputText] = useState('');
  const [modalDisplay, setModalDisplay] = useState('');

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data);
    });

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Escape':
          setModalDisplay('none');
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);

  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    const filteredCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredCountries(filteredCountries);
  }

  let message;
  let showCountries;
  const languages = [];

  const showCountryInfo = (event) => {
    setModalDisplay('block');
    const index = Number(event.target.dataset.value);
    const country = filteredCountries[index];
    setCountryInfo(country);
  } 
  
  const closeModal = () => {
    setModalDisplay('none');
  }

  if (filteredCountries.length > 10) {
    message = 'Too many matches, specify another filter';
  } else if ((filteredCountries.length === 10 || filteredCountries.length < 10) && filteredCountries.length > 1) {
    showCountries = <Countries
      countries={filteredCountries}
      onClick={showCountryInfo}
    />
  } else if (filteredCountries.length === 1) {
    showCountries = filteredCountries.map(country => {
      for (const [key, value] of Object.entries(country.languages)) {
        languages.push(value);
      }
      return (
        <Country
          country={country}
          languages={languages}
        />
      );
    });
  }

  if (inputText.length < 1) {
    message = '';
  }

  return (
    <div>
      <Header />
      <Search
        onChange={(e) => setInputText(e.target.value)}
        handleSearch={handleSearch}
      />
      <Message text={message} />
      {showCountries}
      {Object.keys(countryInfo).length !== 0 ? <Modal
        countryInfo={countryInfo}
        countryLanguages={countryInfo.languages}
        display={modalDisplay}
        onCloseModal={closeModal}
      /> : console.log('hello from console: ((') }
    </div>
  );
}

export default App;