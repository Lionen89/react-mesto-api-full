import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      buttonName="Создать"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          type="url"
          className="popup__text popup__input"
          id="avatar-input"
          name="avatar"
          placeholder="Аватар"
          required
          minLength="2"
          ref={avatarRef}
        />
        <span className="avatar-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
