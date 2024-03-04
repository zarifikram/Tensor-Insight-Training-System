// Notification.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, onClose,isVisible,isSuccess }) => {
 
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
<div
  className={`${
    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
  } transition-transform transition-opacity ease-in-out duration-500 absolute top-5 right-5 ${
    isSuccess ? 'bg-green-500' : 'bg-red-500'
  } text-white px-4 py-2 rounded-md`}
>
  <div className={`text-2xl`}>{message}</div>
  
</div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;