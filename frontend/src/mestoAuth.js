export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, pwd) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: pwd,
      email,
    })
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(`Error: ${err}`));
}

export const authorize = (email, pwd) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: pwd,
      email,
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
  })
  .catch(err => console.log(`Error: ${err}`));
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log(`Error: ${err}`));
}
