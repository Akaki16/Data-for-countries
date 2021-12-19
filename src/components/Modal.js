import React from 'react'
import PropTypes from 'prop-types';

const Modal = ({ countryInfo, countryLanguages, display, onCloseModal }) => {
    const languages = [];
    for (const [key, value] of Object.entries(countryLanguages)) {
        languages.push(value);
    }
    return (
        <div style={{display: display}} className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h1>{countryInfo.name.common}</h1>
                    <i onClick={onCloseModal} style={{
                        color: 'red',
                        cursor: 'pointer'
                    }} className="fas fa-times-circle fa-2x"></i>
                </header>
                <hr />
                <br />
                <p>capital: {countryInfo.capital[0]}</p>
                <p>population: {countryInfo.population}</p>
                <h3>Spoken languages</h3>
                <ul>
                    {languages.map((lang, i) => {
                        return (
                            <li key={i}>{lang}</li>
                        );
                    })}
                </ul>
                <img src={countryInfo.flags.png} alt={countryInfo.name.common} />
            </div>
        </div>
    );
}

Modal.propTypes = {
    countryInfo: PropTypes.object
};

export default Modal;