import { useState } from "react";
import Popup from "./Popup.js";

function PopupWithForm({
  formName,
  title,
  buttonText,
  isOpen,
  onSubmit,
  onClose,
  children
}) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const submitButtonClass = (
    `
      form__submit-btn
      form__submit-btn_theme_dark
      popup__submit-btn
      ${isButtonDisabled && 'form__submit-btn_inactive'}
    `
  );

  function handleChange(event) {
    setIsButtonDisabled(!event.target.closest('form').checkValidity());
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} hasImage={false}>
      <form
        className="form"
        name={formName}
        onSubmit={onSubmit}
        onChange={handleChange}
        noValidate
      >
        <h2 className="form__header popup__header">{title}</h2>
        {children}
        <button
          type="submit"
          className={submitButtonClass}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
