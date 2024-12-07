export const token = '60397107-cb06-4414-91a3-8c0ea70e6582';
export const cohortId = 'frontend-st-cohort-201';
const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function sendRequest(endpoint, options = {}) {
  return fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).then(checkResponse);
}

export function fetchUserData() {
  return sendRequest('/users/me');
}

export function updateUserData(userData) {
  return sendRequest('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(userData),
  });
}

export function fetchInitialCards() {
  return sendRequest('/cards');
}

export function createCard(cardData) {
  return sendRequest('/cards', {
    method: 'POST',
    body: JSON.stringify(cardData),
  });
}

export function toggleLikeOnServer(cardId, like) {
  const method = like ? 'PUT' : 'DELETE';
  return sendRequest(`/cards/${cardId}/likes`, { method });
}

export function deleteCard(cardId) {
  const cohortId = 'frontend-st-cohort-201'; 
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}

export function updateAvatar(avatarUrl) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Не удалось обновить аватар');
    }
    return response.json();
  });
}
