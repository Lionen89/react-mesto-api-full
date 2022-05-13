import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            aria-label="Close"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((item) => {
          return (
            <Card
              card={item}
              key={item._id}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              onCardClick={props.onCardClick}
              onConfirmationfPopup={props.onConfirmationfPopup}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
