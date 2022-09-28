import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextInput from "./TextInput";
import * as mestoAuth from "../mestoAuth.js";

function Register(props) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const history = useHistory();

  function handleEmailChange(value) {
    setEmail(value);
  }

  function handlePwdChange(value) {
    setPwd(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    mestoAuth.authorize(email, pwd).then((res) => {
      if (!res) {
        props.onError();
      } else if (res.token) {
        setEmail('');
        setPwd('');
        props.handleLogin();
        history.push('/');
      }
    })
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

export default Register;
