import logoMesto from "../images/Mesto_Russia.svg";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logoMesto} alt="Лого Место" className="header__logo" />
      <div className="header__links">
        <p className="header__text header__email">
          {location.pathname === "/" ? props.userEmail : ""}
        </p>
        <Link to="/sign-in" className="header__text header__link">
          {location.pathname === "/sign-up" ? "Войти" : ""}
        </Link>
        <Link to="/sign-up" className="header__text header__link">
          {location.pathname === "/sign-in" ? "Регистрация" : ""}
        </Link>
        <button
          onClick={props.onSignOut}
          className="header__text header__button"
        >
          {location.pathname === "/" ? "Выйти" : ""}
        </button>
      </div>
    </header>
  );
}
export default Header;
