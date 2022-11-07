import React from "react";

function Card({card, onCardClick, link, name, likes}) {
  function handleClick() {
    onCardClick(card)
  }

  return (
    <li className="element">
      <img className="element__image" alt={name} src={link} onClick={handleClick} />
      <button className="element__button-trash" type="button" />
      <div className="element__container">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-container">
          <button className="element__button" type="button" />
          <span className="element__like-counter">{likes}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;