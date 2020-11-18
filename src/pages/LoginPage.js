import React from "react";
import { useForm } from "react-hook-form";

import "../styles/LoginPage.sass";

const LoginItem = [
  {
    id: "email",
    type: "text",
    name: "email",
    label: "Email: ",
    placeholder: "Wpisz e-mail...",
    required: "E-mail jest wymagany!",
  },
  {
    id: "password",
    type: "password",
    name: "password",
    label: "Hasło: ",
    placeholder: "Wpisz hasło...",
    required: "Hasło jest wymagane!",
  },
];

const LoginPage = (props) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className="login">
      <h2>Zaloguj się</h2>
      <form className="login-form" onSubmit={handleSubmit(props.handleLogin)}>
        {LoginItem.map((item) => (
          <div key={item.id} className='input-item'>
            <label htmlFor={item.id}>{item.label}</label>
            <input
              type={item.type}
              id={item.id}
              name={item.name}
              placeholder={item.placeholder}
              ref={item.name ? register({
                required: `${item.required}`
              }) : null}
            />
            <div>{errors[item.name] && <p>{errors[item.name].message}</p>}</div>
          </div>
        ))}

        {/* <label htmlFor="username">E-mail:</label>
                <input 
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Wpisz e-mail..."
                    ref={register({
                        required: "E-mail jest wymagany!"
                    })}
                />
                {errors.username && <span>{errors.username.message}</span>}
                <label htmlFor="password">Hasło:</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Wpisz hasło..."
                    ref={register({
                        required: "Hasło jest wymagane!"
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>} */}
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default LoginPage;
