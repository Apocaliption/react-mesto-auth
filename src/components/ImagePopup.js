import React from 'react';

function ImagePopup({card, onClose}) {
  return (
  <div className={`popup popup_img ${card && 'popup_opened'}`}>
    <div className="popup__container-img">
      <button className="popup__close-button" type="button" onClick={onClose} />
      <img className="popup__image" alt={card && card.name} src={card && card.link} />
      <h3 className="popup__subtitle">{card && card.name}</h3>
    </div>
  </div>
  );
}

export default ImagePopup;