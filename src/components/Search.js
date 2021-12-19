import React from 'react'
import PropTypes from 'prop-types';

const Search = ({ onChange, handleSearch }) => {
    return (
        <div className='search-area'>
            <input
            type='text'
            placeholder='Enter a country name'
            onChange={onChange}
            onKeyUp={handleSearch}
            />
        </div>
    );
}

Search.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default Search;