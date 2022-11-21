function PopupWithForm({
  name,
  title,
  onClose,
  isOpen,
  form,
  children,
  buttonText,
  onSubmit
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && `popup_opened`}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <form className="popup__form" name={form} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
