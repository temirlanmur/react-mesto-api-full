import { useState } from "react";
import TextInput from "./TextInput";
import * as mestoAuth from "../utils/mestoAuth.js";

function Login({
  handleLogin,
  onError,
}) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  function handleEmailChange(value) {
    setEmail(value);
  }

  function handlePwdChange(value) {
    setPwd(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    mestoAuth
      .authorize(email, pwd)
      .then((response) => {
        if (!response) {
          onError();
        } else if (response.token) {
          handleLogin(response.token);
          setEmail('');
          setPwd('');
        }
      })
      .catch((err) => {
        onError();
        console.log(err);
      });
  }

  return (
    <div className="register">
      <form className="form form_theme_dark" onSubmit={handleSubmit}>
        <h2 className="form__header register__heading">
          Вход
        </h2>
        <label className="form__label">
          <TextInput
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required={true}
          />
        </label>
        <label className="form__label">
          <TextInput
            type="password"
            name="password"
            value={pwd}
            onChange={handlePwdChange}
            placeholder="Пароль"
            required={true}
          />
        </label>
        <button
          type="submit"
          className="form__submit-btn form__submit-btn_theme_light register__submit-btn"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
