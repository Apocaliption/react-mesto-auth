import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"profile"}
      form={"profileData"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
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
          onChange={handleNameChange} 
          value={name || ""}
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
          onChange={handleDescriptionChange} 
          value={description || ""}
        />
        <span className="popup__input-error description-input-error" />
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup; 