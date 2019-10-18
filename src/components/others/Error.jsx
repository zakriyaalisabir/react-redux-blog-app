import React from 'react';
import PropTypes from 'prop-types';

const Error = props => {
  return (
    <>
      <h1 className='App'>Error : {props.error}</h1>
    </>
  );
};

Error.propTypes = {
  error: PropTypes.string
};

Error.defaultProps = {
  error: '404 Not Found...'
};

export default Error;
