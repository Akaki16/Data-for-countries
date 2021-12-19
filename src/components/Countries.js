import React from 'react'
import PropTypes from 'prop-types';

const Countries = ({ countries, onClick }) => {
    return (
        <div className='countries'>
            {countries.map((country, i) => {
                const id = country.area;
                return (
                    <h2 key={id}>{country.name.common} <button data-value={i} type='button' onClick={onClick}>Show</button></h2>
                );
            })}
        </div>
    );
}

Countries.propTypes = {
    countries: PropTypes.array
};

export default Countries;