import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  const isOpen = card ? true : false;

  return (
    <Popup isOpen={isOpen} onClose={onClose} hasImage={true}>
      <img
        className="popup__image"
        src={card?.link}
        alt={card?.name}
      />
      <p className="popup__img-caption">{card?.name}</p>
    </Popup>
  );
}

export default ImagePopup;
