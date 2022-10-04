import Popup from "./Popup.js";
import successIconPath from '../../images/auth-success.svg';
import errorIconPath from '../../images/auth-error.svg';

function InfoTooltip({ isOpen, onClose, isError }) {

  const popupText =
    isError
    ? 'Что-то пошло не так! Попробуйте ещё раз.'
    : 'Вы успешно зарегистрировались!';

  const iconPath =
    isError
    ? errorIconPath
    : successIconPath

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      hasImage={false}
    >
      <div className="infotooltip">
        <img
          src={iconPath}
          alt="Иконка"
          className="infotooltip__icon"
        />
        <p className="infotooltip__text">
          {popupText}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
