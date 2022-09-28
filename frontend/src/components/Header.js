import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  const history = useHistory();

  const isLoggedIn = props.isLoggedIn;

  let link = {
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
    props.onLogout();
    history.push('/sign-in');
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
              <li className="header__link-item">{props.email}</li>
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
