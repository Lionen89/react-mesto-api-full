function ImagePopup(props) {
    return(
        <div className={`popup popup_photo ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__photo-container">
          <img className="popup__image" src={props.card && props.card.link } 
          alt={props.card.name} />
          <h2 className="popup__photo-title">{props.card && props.card.name}</h2>
          <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        </div>
      </div>
    )
}
export default ImagePopup