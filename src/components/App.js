import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name={"profile"}
        form={"profileData"}
        title={"Редактировать профиль"}
        buttonText={"Сохранить"}
      >
        <>
          <input
            type="text"
            name="name"
            id="name-input"
            className="popup__input popup__input_type_name"
            minLength={2}
            maxLength={40}
            placeholder="Имя"
            required=""
          />
          <span className="popup__input-error name-input-error" />
          <input
            type="text"
            name="description"
            id="description-input"
            className="popup__input popup__input_type_description"
            minLength={2}
            maxLength={200}
            placeholder="Профессия"
            required=""
          />
          <span className="popup__input-error description-input-error" />
        </>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name={"add"}
        form={"cardData"}
        title={"Новое место"}
        buttonText={"Создать"}
      >
        <>
          <input
            type="text"
            name="name"
            id="title-input"
            placeholder="Название"
            className="popup__input popup__input_type_name"
            minLength={2}
            required=""
          />
          <span className="popup__input-error title-input-error" />
          <input
            type="url"
            name="description"
            id="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_description"
            required=""
          />
          <span className="popup__input-error url-error" />
        </>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name={"avatar"}
        form={"cardData"}
        title={"обновить аватар"}
        buttonText={"Сохранить"}
      >
        <>
          <input
            type="url"
            name="avatar"
            id="avatar"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_description"
            required=""
          />
          <span className="popup__input-error avatar-error" />
        </>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
