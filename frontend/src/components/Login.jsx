import Header from "./Header";
import React from "react";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.hadleLogin(password, email)
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__form-field">
          <input
            type="email"
            className="auth__text"
            name="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="30"
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
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
