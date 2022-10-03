class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;

    const token = localStorage.getItem('token');
    if (token) {
      this._headers['Authorization'] = `Bearer ${token}`;
    }
  }

  setAuthToken = (token) => this._headers['Authorization'] = `Bearer ${token}`;

  _sendRequest = ({ method = 'GET', url, body = null }) => {
    const requestOptions = {
      method,
      headers: this._headers,
    };

    if (body) {
      requestOptions.body = body;
    }

    return fetch(this._baseUrl + url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response}`);
      });
  }

  // gets user info
  getUserInfo = () => this._sendRequest({ url: '/users/me' });

  // gets cards data
  getCards = () => this._sendRequest({ url: '/cards' });

  // gets user info & cards array
  getData = () => Promise.all([
    this.getUserInfo(),
    this.getCards(),
  ]);

  // sends request to update user profile
  updateProfile = ({ name, about }) => this._sendRequest({
    method: 'PATCH',
    url: '/users/me',
    body: JSON.stringify({ name, about }),
  });

  // sends request to update profile avatar
  updateProfileAvatar = (avatarLink) => this._sendRequest({
    method: 'PATCH',
    url: '/users/me/avatar',
    body: JSON.stringify({ avatar: avatarLink }),
  });

  // sends request to add new card
  addCard = ({ name, link }) => this._sendRequest({
    method: 'POST',
    url: '/cards',
    body: JSON.stringify({ name, link }),
  });

  // sends request to add like to the card
  addLikeToCard = (cardId) => this._sendRequest({
    method: 'PUT',
    url: '/cards/' + cardId + '/likes',
  });

  // sends request to remove like from the card
  deleteLikeFromCard = (cardId) => this._sendRequest({
    method: 'DELETE',
    url: '/cards/' + cardId + '/likes',
  });

  // adds or deletes like from card depending on a given parameter
  changeLikeCardStatus = (cardId, isLiked) => {
    if (isLiked) {
      return this.addLikeToCard(cardId);
    }
    return this.deleteLikeFromCard(cardId);
  };

  // sends request to delete card
  deleteCard = (cardId) => this._sendRequest({
    method: 'DELETE',
    url: '/cards/' + cardId,
  });
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

export { api };
