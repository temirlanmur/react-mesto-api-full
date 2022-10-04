const BASE_URL = 'http://localhost:3001';

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
