import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import apiReact from "../utils/apiReact";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import apiAuth from "../utils/AuthApi";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isPopupImageOpen, setPopupImageOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isIsInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] =
    React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    if(loggedIn){
    Promise.all([apiReact.getProfileData(), apiReact.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }}, [loggedIn]);
  React.useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        apiAuth.checkToken(jwt).then((data) => {
          handleLoggedIn();
          handleEmail(data.data.email);
          history.push("/");
        })
        .catch((err) => console.log(`Ошибка: ${err.status}`));
      }
    };
    tokenCheck();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setPopupImageOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setPopupImageOpen(false);
  }
  function handleUpdateUser(data) {
    apiReact
      .editProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }
  function handleUpdateAvatar(url) {
    apiReact
      .setNewAvatar(url)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiReact
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  function handleCardDelete(card) {
    // let newCards = cards.filter((element) => element._id !== card._id);
    apiReact
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((element) => element._id !== card._id)
        );
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }
  function handleAddPlaceSubmit(newCard) {
    apiReact
      .addNewCard(newCard)
      .then((newCards) => {
        setCards([newCards, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }
  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    if (isRegistrationComplete) {
      history.push("/sign-in");
    }
  }

  const handleLoggedIn = () => {
    setLoggedIn(true);
  };
  const handleEmail = (email) => {
    setEmail(email);
  };

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  }
  const hadleLogin = (password, UserEmail) => {
    apiAuth
    .loginUser(password, UserEmail)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        handleLoggedIn();
        handleEmail(UserEmail);

        history.push("/");
      }
    })
    .catch(() => {
      setIsInfoTooltipOpen(true);
      setIsRegistrationComplete(false);
    });
}

  const hadleRegister = (password, UserEmail) => {
    apiAuth
      .registerUser(password, UserEmail)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationComplete(true);
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationComplete(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="main-page">
        <Header userEmail={email} onSignOut={signOut} />
        <div className="main-page__container">
          <Switch>
            <Route path="/sign-up">
              <Register
                setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                setIsRegistrationComplete={setIsRegistrationComplete}
                hadleRegister={hadleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                hadleLogin={hadleLogin}
              />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            ></ProtectedRoute>
          </Switch>
          <Footer />
        </div>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isPopupImageOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isIsInfoTooltipOpen}
          onClose={closeInfoTooltip}
          registrationComplete={isRegistrationComplete}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
