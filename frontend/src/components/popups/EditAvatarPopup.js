import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";
import TextInput from "../TextInput.js";

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
  const inputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      title='Обновить аватар?'
      formName='edit-avatar'
      buttonText='Сохранить'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="form__label">
        <TextInput
          type="url"
          name="avatarLink"
          onChange={(_) => {}}
          placeholder="Ссылка на картинку"
          required={true}
          ref={inputRef}
        />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
