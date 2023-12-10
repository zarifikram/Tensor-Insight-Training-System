// ParentComponent.js

import React, { useState } from 'react';
import Popup from './ColorProfilePickerPopUp';

const ParentComponent = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      <Popup isOpen={isPopupOpen} onClose={closePopup}/>
    </div>
  );
};

export default ParentComponent;
