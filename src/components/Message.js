import React from 'react'
import PropTypes from 'prop-types';

const Message = ({ text }) => {
    return (
        <p className='message'>{text}</p>
    );
}

Message.propTypes = {
    text: PropTypes.string
};

export default Message;