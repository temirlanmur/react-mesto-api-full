import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import TextInput from "../TextInput.js";

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(value) {
    setName(value);
  }

  function handleDescriptionChange(value) {
    setDescription(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      formName='edit-profile'
      buttonText='Сохранить'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="form__label">
        <TextInput
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required={true}
        />
      </label>
      <label className="form__label">
        <TextInput
          type="text"
          name="name"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required={true}
        />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
