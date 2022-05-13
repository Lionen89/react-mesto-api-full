import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.hadleRegister(password, email)
  }

  return (
        <div className="auth">
          <h2 className="auth__title">Регистрация</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            <label className="auth__form-field">
              <input
                type="email"
                className="auth__text"
                name="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="60"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <label className="auth__form-field">
              <input
                type="password"
                className="auth__text"
                id="password-input"
                name="password"
                placeholder="Пароль"
                required
                value={password}
                onChange={handlePasswordChange}
                minLength="6"
              />
            </label>
            <button type="submit" className="auth__save-button">
              Зарегистрироваться
            </button>
            <Link to="/sign-in" className="auth__link">
              Уже зарегистрированы? Войти
            </Link>
          </form>
        </div>

  );
}
export default Register;
