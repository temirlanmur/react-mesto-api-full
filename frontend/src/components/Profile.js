import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Profile({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  isLoading
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <button
        type="button"
        className="profile__update-avatar-btn"
        onClick={onEditAvatar}
      >
        <img alt="Аватар" className="profile__avatar" src={currentUser.avatar} />
      </button>
      <div className="profile__info">
        <h1 className="profile__name">
          {isLoading ? 'Загрузка профиля...' : currentUser.name}
        </h1>
        <button
          type="button"
          className="profile__edit-btn"
          onClick={onEditProfile}
        ></button>
        <p className="profile__description">
          {isLoading? 'Загрузка...' : currentUser.about}
        </p>
      </div>
      <button
        type="button"
        className="profile__add-btn"
        onClick={onAddPlace}
      ></button>
    </section>
  );
}

export default Profile;
