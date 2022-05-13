class AuthApi {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }
  _checkResults(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  registerUser(password, email) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResults);
  }
  loginUser(password, email) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResults);
  }
  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResults);
  }
}
const apiAuth = new AuthApi("https://auth.nomoreparties.co", {
  "Content-Type": "application/json",
});
export default apiAuth;
