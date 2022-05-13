export class Api {
    constructor(url, headers) {
        this._url = url;
        this._headers = headers
    };

    _checkResults(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getProfileData() {
        return fetch(`${this._url}/users/me`, {
                method: 'GET',
                headers: this._headers,
            })
            .then(this._checkResults)
    };

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                }),
            })
            .then(this._checkResults)
    };

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkResults)
    };

    addNewCard(newCard) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: newCard.name,
                    link: newCard.link
                })
            })
            .then(this._checkResults)
    };

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResults)
    };

    _setLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._checkResults)
    }

    _deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResults)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this._deleteLike(cardId)
        } else {
            return this._setLike(cardId)
        }
    }
    setNewAvatar(newAvatarURL) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify(
                    newAvatarURL
                ),
            })
            .then(this._checkResults)
    }

}
const myUrl = 'https://mesto.nomoreparties.co/v1/cohort-34'
const myHeaders = {
    authorization: 'cfb2b6f5-426e-4056-b62c-e6e89dc9d392',
    'Content-Type': 'application/json',
};
const apiReact = new Api(myUrl, myHeaders);
export default apiReact