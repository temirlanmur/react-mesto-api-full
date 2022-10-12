const { NODE_ENV = 'development' } = process.env;
const isDevelopment = NODE_ENV === 'development';

const BASE_URL = isDevelopment ? 'http://localhost:3001' : 'http://api.smart.apple.nomoredomains.icu';

const _handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response}`);
}

const register = (email, pwd) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pwd }),
  })
  .then(_handleResponse);
}

const authorize = (email, pwd) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pwd }),
  })
  .then(_handleResponse);
}

const getProfile = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(_handleResponse);
}

export {
  BASE_URL,
  register,
  authorize,
  getProfile
}
