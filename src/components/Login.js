import { useState } from "react";

function Login({ onLogin }) {
  const initialData = {
    email: "",
    password: "",
  };
  const [profileData, setProfileData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((profileData) => ({ ...profileData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!profileData.password || !profileData.email) {
      return;
    }
    onLogin(profileData);
  };

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="login__input"
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete="on"
          onChange={handleChange}
          required
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
