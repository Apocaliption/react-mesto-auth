import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import resolve from "../images/Union.svg";
import reject from "../images/Union2.svg";


function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [emailName, setEmailName] = React.useState(null);
  const [popupImage, setPopupImage] = React.useState("");
  const [popupTitle, setPopupTitle] = React.useState("");
  const [infoTooltip, setInfoTooltip] = React.useState(false);

  function onRegister({email, password}) {
    auth
      .registerUser(email, password)
      .then(() => {
        setPopupImage(resolve);
        setPopupTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте еще раз.");
      })
      .finally(handleInfoTooltip);
  }

  function onLogin({email, password}) {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailName(email);
        navigate("/");
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте еще раз.");
        handleInfoTooltip();
      })
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailName(res.data.email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    if (isLoggedIn) {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, cardsData]) => {
        setCurrentUser(user);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isLoggedIn]);

  function handleUpdateUser(data) {
    api
      .updateUserData(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAvatarUpdate(data) {
    api
      .changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/sign-in"
              element={
                <>
                  <Header title="Регистрация" route="/sign-up" />
                  <Login onLogin={onLogin} />
                </>
              }
            />

            <Route
              path="/sign-up"
              element={
                <>
                  <Header title="Войти" route="/sign-in" />
                  <Register onRegister={onRegister} />
                </>
              }
            />

            <Route
              exact
              path="/"
              element={
                <>
                  <Header
                    title="Выйти"
                    mail={emailName}
                    onClick={onSignOut}
                    route=""
                  />
                  <ProtectedRoute
                    component={Main}
                    isLogged={isLoggedIn}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    handleClick={handleCardClick}
                    cards={cards}
                    handleLikeClick={handleCardLike}
                    handleDeleteClick={handleCardDelete}
                  />
                  <Footer />
                </>
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAvatarUpdate}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />

          <InfoTooltip
            image={popupImage}
            title={popupTitle}
            isOpen={infoTooltip}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
