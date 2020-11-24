import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import {UserContext} from '../Context/UserContext';

import "../styles/Page/LoginPage.sass";

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
  const {isUserLogged} = useContext(UserContext)

  if(isUserLogged){
    return (<Redirect to='/'/>)
  }

  return (
    <div className="login">
      <h2>Zaloguj się</h2>
      <form className="login-form" onSubmit={handleSubmit(props.handleLogin)}>
        {props.failedLogin && (
          <div className="failed-login">
            <p>Nieprawidłowy e-mail lub hasło.</p>
          </div>
        )}
        {LoginItem.map((item) => (
          <div key={item.id} className="input-item">
            <label htmlFor={item.id}>{item.label}</label>
            <input
              type={item.type}
              id={item.id}
              name={item.name}
              placeholder={item.placeholder}
              ref={
                item.name
                  ? register({
                      required: `${item.required}`,
                    })
                  : null
              }
            />
            <div>{errors[item.name] && <span>{errors[item.name].message}</span>}</div>
          </div>
        ))}
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default LoginPage;
