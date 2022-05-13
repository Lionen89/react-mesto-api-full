import imageOK from "../images/Union.svg";
import imageNotOK from "../images/Union(1).svg";

function InfoTooltip(props) {
    let image
    let text
    if (props.registrationComplete) { 
        text= 'Вы успешно зарегистрировались!'
        image= imageOK
    }
    else {
    text= 'Что-то пошло не так! Попробуйте  еще раз'
    image= imageNotOK
    }
  return (
    <div className={`tooltip ${props.isOpen ? "tooltip_opened" : ""}`}>
      <div className="tooltip__container">
        <img src={image} className="tooltip__image"/>
          <h2 className="tooltip__text">{text}</h2>
          <button
            type="button"
            className="tooltip__close-button"
            onClick={props.onClose}
          ></button>
      </div>
    </div>
  );
}
export default InfoTooltip;
