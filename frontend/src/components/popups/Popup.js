function Popup({ isOpen, onClose, hasImage, children }) {

  const popupClass = `popup ${hasImage && 'popup_darker'} ${isOpen && 'popup_opened'}`;
  const containerClass = `${hasImage ? 'popup__img-container' : 'popup__container'}`;

  function handleClose(event) {
    if (event.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <div
      className={popupClass}
      onClick={handleClose}
    >
      <div className={containerClass}>
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        >
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
