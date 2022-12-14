import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {

  const [profileData, setProfileData] = useState({})

  function handleChange(e) {
    const { name, value } = e.target;
    setProfileData((profileData) => ({...profileData, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(profileData)
  }

  return (
    <section className="login">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input className="login__input" type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input className="login__input" type="password" placeholder="Пароль" name="password" autoComplete="on" onChange={handleChange} />
          <button className="login__button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="login__text">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link> </p>
      </section>
  )
}

export default Register;
