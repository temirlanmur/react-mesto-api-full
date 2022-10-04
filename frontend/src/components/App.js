import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Header from "./Header.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Main from "./Main.js";
import InfoTooltip from "./popups/InfoTooltip.js";
import AddPlacePopup from "./popups/AddPlacePopup.js";
import EditAvatarPopup from "./popups/EditAvatarPopup.js";
import EditProfilePopup from "./popups/EditProfilePopup.js";
import ImagePopup from "./popups/ImagePopup.js";
import { api } from "../utils/api.js";
import * as mestoAuth from "../utils/mestoAuth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import defaultAvatarPath from '../images/avatar.jpg';

const defaultUser = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: defaultAvatarPath,
  email: ''
};

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cards, setCards] = useState([]);

  const [popupState, setPopupState] = useState({
    editAvatar: false,
    editProfile: false,
    addPlace: false,
    authPopup: {
      open: false,
      error: false,
    }
  });

  const [selectedCard, setSelectedCard] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getData()
        .then(([user, cards]) => {
          setCurrentUser((prevState) => ({...prevState, ...user}));
          setCards(cards);
        })
        .catch((err) => console.log(err))
        .finally(setIsLoading(false));
    }
  }, [isLoggedIn]);

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mestoAuth
        .getProfile(token)
        .then((response) => {
          if (response) {
            setIsLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`))
        .finally(setIsLoading(false));
    }
  }

  function handleLogin(token) {
    localStorage.setItem('token', token);
    api.setAuthToken(token);
    setIsLoggedIn(true);
    history.push('/');
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(defaultUser);
    history.push('/sign-in');
  }

  function handleUpdateUser({ name, about}) {
    api
      .updateProfile({ name, about })
      .then((userData) => setCurrentUser((prevState) => ({...prevState, ...userData})))
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally((_) => closeAllPopups());
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .updateProfileAvatar(avatarLink)
      .then((userData) => setCurrentUser((prevState) => ({...prevState, ...userData})))
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally((_) => closeAllPopups());
  }

  function handleAddPlace(placeData) {
    api
      .addCard(placeData)
      .then((cardData) => setCards([cardData, ...cards]))
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally((_) => closeAllPopups());
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevState) => prevState.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(_ => {
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleEditAvatarClick() {
    setPopupState((prevState) => ({...prevState, editAvatar: true}));
  }

  function handleEditProfileClick() {
    setPopupState((prevState) => ({...prevState, editProfile: true}));
  }

  function handleAddPlaceClick() {
    setPopupState((prevState) => ({...prevState, addPlace: true}));
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function handleRegistrationSuccess() {
    setPopupState((prevState) => {
      return {...prevState, authPopup: {
        open: true,
        error: false
      }};
    });
  }

  function handleAuthError() {
    setPopupState((prevState) => {
      return {...prevState, authPopup: {
        open: true,
        error: true
      }};
    });
  }

  function closeAllPopups() {
    setPopupState({
      editAvatar: false,
      editProfile: false,
      addPlace: false,
      authPopup: {
        open: false,
        error: false,
      },
    });
    setSelectedCard(null);
  }

  return (
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Switch>
        <Route path="/sign-up">
          <Register
            onError={handleAuthError}
            onSuccess={handleRegistrationSuccess}
          />
        </Route>
        <Route path="/sign-in">
          <Login
            handleLogin={handleLogin}
            onError={handleAuthError}
          />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={isLoggedIn}
          component={Main}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          isLoading={isLoading}
        />
      </Switch>
      <InfoTooltip
        isOpen={popupState.authPopup.open}
        onClose={closeAllPopups}
        isError={popupState.authPopup.error}
      />
      <EditAvatarPopup
        isOpen={popupState.editAvatar}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
      />
      <EditProfilePopup
        isOpen={popupState.editProfile}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        isOpen={popupState.addPlace}
        onAddPlace={handleAddPlace}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
