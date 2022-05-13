import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete();
  }
  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      isOpen={props.isOpen}
      buttonName="Да"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
export default ConfirmationPopup;
