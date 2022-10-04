import { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import TextInput from "../TextInput.js";

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  function handlePlaceNameChange(value) {
    setPlaceName(value);
  }

  function handlePlaceLinkChange(value) {
    setPlaceLink(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({ name: placeName, link: placeLink })
    setPlaceName('');
    setPlaceLink('');
  }

  return (
    <PopupWithForm
      title='Новое место'
      formName='add-place'
      buttonText='Создать'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="form__label">
        <TextInput
          type="text"
          name="placeName"
          value={placeName}
          onChange={handlePlaceNameChange}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required={true}
        />
      </label>
      <label className="form__label">
        <TextInput
          type="url"
          name="placeLink"
          value={placeLink}
          onChange={handlePlaceLinkChange}
          placeholder="Ссылка на картинку"
          required={true}
        />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
