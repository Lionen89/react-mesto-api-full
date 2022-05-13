import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    if (Object.keys(currentUser).length) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescrChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      buttonName="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          type="text"
          className="popup__input popup__text"
          id="name-input"
          name="name"
          required
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
        />
        <span className="name-input-error popup__error"></span>
      </label>
      <label className="popup__form-field">
        <input
          type="text"
          className="popup__input popup__text"
          id="description-input"
          name="description"
          required
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          value={description}
          onChange={handleDescrChange}
        />
        <span className="description-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
