import React from "react"

function PopupWithForm(props) {
    return (
        // шаблон попапа
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{`${props.title}`}</h2>
                <form className="popup__form" name={`${props.name}-form`} //noValidate
                onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save-button">{props.buttonName}</button>
                </form>
                    <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}
export default PopupWithForm