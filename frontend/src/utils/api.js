// API class definition
class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;

    let token = localStorage.getItem('token');
    if (token) {
      this._headers['Authorization'] = `Bearer ${token}`;
    }
  }

  _handleResponse = response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка: ${response}`);
  }

  // sets authorization header
  setAuthToken(token) {
    this._headers['Authorization'] = `Bearer ${token}`;
  }

  // gets user info
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // gets cards data
  getCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // gets user info & cards array
  getData() {
    return Promise.all([
      this.getUserInfo(),
      this.getCards(),
    ]);
  }

  // sends request to update user profile
  updateProfile({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about })
    })
      .then(this._handleResponse);
  }

  // sends request to update profile avatar
  updateProfileAvatar(avatarLink) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarLink })
    })
      .then(this._handleResponse);
  }

  // sends request to add new card
  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link })
    })
      .then(this._handleResponse);
  }

  // sends request to add like to the card
  addLikeToCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // sends request to remove like from the card
  deleteLikeFromCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // adds or deletes like from card depending on a given parameter
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLikeToCard(cardId);
    }
    return this.deleteLikeFromCard(cardId);
  }

  // sends request to delete card
  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

export { api };
