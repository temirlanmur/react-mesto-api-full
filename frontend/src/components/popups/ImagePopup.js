import Popup from "./Popup";

function ImagePopup(props) {
  const isOpen = props.card ? true : false;

  return (
    <Popup isOpen={isOpen} onClose={props.onClose} hasImage={true}>
      <img
        className="popup__image"
        src={props.card?.link}
        alt={props.card?.name}
      />
    </Popup>
  );
}

export default ImagePopup;
