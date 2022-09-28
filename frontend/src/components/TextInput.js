import { forwardRef, useState } from "react";

function TextInput(props, ref) {
  const [errorText, setErrorText] = useState('');

  const inputClass = `form__text-input ${errorText && 'form__text-input_type_error'}`

  function handleChange(event) {
    const input = event.target;
    props.onChange(input.value);
    if (!input.validity.valid) {
      setErrorText(input.validationMessage);
    } else {
      setErrorText('');
    }
  }

  return (
    <>
      <input
        className={inputClass}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        required={props.required}
        ref={ref}
      />
      <span className="form__error-text">
        {errorText}
      </span>
    </>
  );
}

export default forwardRef(TextInput);
