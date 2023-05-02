export default class Api {
  constructor(options) {
    this._address = options.baseUrl;
    this._cohortId = options.cohortId;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._cohortId}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка при запросе: код ошибки (${res.status}), сообщение "${res.statusText}"`);
    })
    .catch(err => console.log(err));
  }

  setUserInfo({ userName, userDescription }) {
    return fetch(`${this._address}/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userDescription
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка при запросе: код ошибки (${res.status}), сообщение "${res.statusText}"`);
    })
    .catch(err => console.log(err));
  }

  getCards() {
    return fetch(`${this._address}/${this._cohortId}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка при запросе: код ошибки (${res.status}), сообщение "${res.statusText}"`);
    })
    .catch(err => console.log(err));
  }

  addCard(cardItem) {
    return fetch(`${this._address}/${this._cohortId}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardItem.name,
        link: cardItem.link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка при запросе: код ошибки (${res.status}), сообщение "${res.statusText}"`);
    })
    .catch(err => console.log(err));
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка при запросе: код ошибки (${res.status}), сообщение "${res.statusText}"`);
    })
    .catch(err => console.log(err));
  }

  addLike(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка при запросе: код ошибки (${res.status}), сообщение "${res.statusText}"`);
    })
    .catch(err => console.log(err));
  }

  deleteLike(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка при запросе: код ошибки (${res.status}), сообщение "${res.statusText}"`);
    })
    .catch(err => console.log(err));
  }

  updateProfilePhoto(avatar) {
    return fetch(`${this._address}/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка при запросе: код ошибки (${res.status}), сообщение "${res.statusText}"`);
    })
    .catch(err => console.log(err));
  }
}