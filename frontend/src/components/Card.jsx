import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__trash  ${
    isOwn ? "element__trash_active" : ""
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__heart ${
    isLiked ? "element__heart_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <article className="element" _id={props.card._id}>
      <img
        className="element__image"
        onClick={handleClick}
        src={`${props.card.link}`}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удаление"
        onClick={handleDeleteClick}
      ></button>
      <div className="element__description">
        <h2 className="element__title">{`${props.card.name}`}</h2>
        <div className="element__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__heart-amount">{`${props.card.likes.length}`}</span>
        </div>
      </div>
    </article>
  );
}
export default Card;
