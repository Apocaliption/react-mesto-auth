import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      avatar: avatarRef.current.value
    });
  }
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"avatar"}
      form={"cardData"}
      title={"обновить аватар"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <>
          <input
            type="url"
            name="avatar"
            id="avatar"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_description"
            required=""
            ref={avatarRef}
          />
          <span className="popup__input-error avatar-error" />
        </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup; 