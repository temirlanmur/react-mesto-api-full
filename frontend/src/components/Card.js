import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);

  const cardDeleteButtonClassName = (
    `card__trash-btn ${ !isOwn ? 'card__trash-btn_hidden' : '' }`
  );
  const cardLikeButtonClassName = (
    `card__like-btn ${ isLiked ? 'card__like-btn_active' : '' }`
  );

  function handleClick() {
    onCardClick({ name: card.name, link: card.link });
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      >
      </button>
      <button
        type="button"
        className="card__popup-btn"
        onClick={handleClick}
      >
        <img
          className="card__img"
          src={card.link}
          alt={card.name}
        />
      </button>
      <div className="card__body">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-section">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          >
          </button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
