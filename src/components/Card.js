import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `element__button-trash ${isOwn ? '' : 'element__button-trash_hide'}`
  ); 
  const cardLikeButtonClassName = (
    `element__button ${isLiked ? 'element__button_is-active' : ''}`
  );

  return (
    <li className="element">
      <img className="element__image" alt={props.name} src={props.link} onClick={handleClick} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} />
      <div className="element__container">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <span className="element__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;