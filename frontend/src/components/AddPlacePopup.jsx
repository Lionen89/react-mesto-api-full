import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      buttonName="Создать"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          type="text"
          className="popup__text popup__input"
          id="card-input"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <span className="card-input-error popup__error"></span>
      </label>
      <label className="popup__form-field">
        <input
          type="url"
          className="popup__text popup__input"
          id="link-input"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="link-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
