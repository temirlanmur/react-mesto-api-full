import React from "react";
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
import * as mestoAuth from "../mestoAuth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import defaultAvatarPath from '../images/default-avatar.png';

function App() {

  const [currentUser, setCurrentUser] = React.useState({
    name: 'Гость',
    about: '',
    avatar: defaultAvatarPath
  });

  const [email, setEmail] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [authPopup, setAuthPopup] = React.useState({
    open: false,
    error: false
  });

  const [isLoading, setIsLoading] = React.useState(true);

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
    api
      .getData()
      .then((data) => {
        const userData = data[0];
        const cardsArray = data[1];

        setCurrentUser(userData);
        setCards(cardsArray);
      })
      .catch((err) => console.log(err))
      .finally(_ => setIsLoading(false));
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      mestoAuth.getContent(token).then(res => {
        if (res) {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
    }
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setEmail('');
    setCurrentUser({ name: 'Гость', about: '', avatar: defaultAvatarPath });
  }

  function handleUpdateUser(userInfo) {
    api
      .updateProfile(userInfo)
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch(err => console.log(err))
      .finally(_ => closeAllPopups())
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .updateProfileAvatar(avatarLink)
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch(err => console.log(err))
      .finally(_ => closeAllPopups())
  }

  function handleAddPlace(placeInfo) {
    api
      .addCard(placeInfo)
      .then(cardData => {
        setCards([cardData, ...cards]);
      })
      .catch(err => console.log(err))
      .finally(_ => closeAllPopups())
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
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
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function handleRegistrationSuccess() {
    setAuthPopup({
      open: true,
      error: false
    })
  }

  function handleAuthError() {
    setAuthPopup({
      open: true,
      error: true
    })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setAuthPopup(prevState => {
      return {...prevState, 'open': false}
    });
  }

  return (
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} email={email} onLogout={handleLogout} />
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
        isOpen={authPopup.open}
        onClose={closeAllPopups}
        isError={authPopup.error}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlace}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
