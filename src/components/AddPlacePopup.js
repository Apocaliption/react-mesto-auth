import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      name: name,
      link: link
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
        isOpen={props.isOpen}
        onClose={props.onClose}
        name={"add"}
        form={"cardData"}
        title={"Новое место"}
        buttonText={"Создать"}
        onSubmit={handleSubmit}
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
            value={name} 
            onChange={handleNameChange}
          />
          <span className="popup__input-error title-input-error" />
          <input
            type="url"
            name="description"
            id="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_description"
            required=""
            value={link} 
            onChange={handleLinkChange}
          />
          <span className="popup__input-error url-error" />
        </>
      </PopupWithForm>
  )
}

export default AddPlacePopup; 