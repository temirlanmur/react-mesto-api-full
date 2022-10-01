import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import logoPath from '../images/logo.svg';

function Header({
  isLoggedIn,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const path = useLocation().pathname;

  const link = {
    address: '',
    text: ''
  }

  if (!isLoggedIn) {
    if (path === '/sign-up') {
      link.address = '/sign-in';
      link.text = 'Войти';
    } else if (path === '/sign-in') {
      link.address = '/sign-up';
      link.text = 'Регистрация';
    }
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleLogout() {
    onLogout();
  }

  return (
    <header className="header">
      <img
        src={logoPath}
        alt="Логотип Место"
        className="header__logo"
      />
      {
        !isLoggedIn
          ?
        <Link to={link.address} className="link">
          {link.text}
        </Link>
          :
        (
          <>
            <button className="header__toggle-btn" onClick={toggleMenu}>
              <span className="header__bar"></span>
              <span className="header__bar"></span>
              <span className="header__bar"></span>
            </button>
            <ul className={`header__link-items ${isMenuOpen && 'header__link-items_active'}`}>
              <li className="header__link-item">{currentUser.email}</li>
              <li className="header__link-item">
                <button className="link" onClick={handleLogout}>Выйти</button>
              </li>
            </ul>
          </>
        )
      }

    </header>
  );
}

export default Header;
