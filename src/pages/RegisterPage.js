import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";

import "../styles/RegisterPage.sass";

const registerItem = [
  {
    type: "text",
    id: "name",
    name: "name",
    placeholder: "Wpisz imię...",
    label: "Imię: ",
    required: "Imię jest wymagane!",
    class: "input-item",
  },
  {
    type: "text",
    id: "surname",
    name: "surname",
    placeholder: "Wpisz nazwisko...",
    label: "Nazwisko:",
    required: "Nazwisko jest wymagane!",
    class: "input-item",
  },
  {
    type: "text",
    id: "email",
    name: "email",
    placeholder: "Wpisz e-mail...",
    label: "E-mail: ",
    required: "E-mail jest wymagany!",
    class: "input-item",
  },
  {
    type: "text",
    id: "phone",
    name: "phone",
    placeholder: "Wpisz nr. telefonu...",
    label: "Telefon:",
    required: false,
    class: "input-item",
  },
  {
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Wpisz hasło...",
    label: "Hasło:",
    required: "Hasło jest wymagane!",
    class: "input-item",
  },
  {
    type: "password",
    id: "confirm-password",
    name: "confirmPassword",
    placeholder: "Wpisz hasło...",
    label: "Potwierdź hasło:",
    required: "Musisz potwierdzić hasło!",
    class: "input-item",
  },
  {
    type: "checkbox",
    id: "confirm-regulations",
    name: "confirmRegulations",
    label:
      "Mam ukończone 16 lat i potwierdzam, że przeczytałem i zrozumiałem Politykę Prywatności oraz akceptuję Regulamin świadczenia usług drogą elektroniczną.",
    required: "Musisz zatwierdzić!",
    class: "check-item",
  },
];

const RegisterPage = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const handleError = (item) => {
    // console.log(props.failedRegister);
    if (props.failedRegister) {
      for (const error of props.failedRegister) {
        if (!error.loc) return null;
        if (error.loc[1] === item) {
          return error.msg;
        }
      }
      return null;
    }
  };

  const registerList = registerItem.map((item) => (
    <div className={item.class} key={item.id}>
      <label htmlFor={item.id}>{item.label}</label>
      <input
        type={item.type}
        id={item.id}
        name={item.name}
        placeholder={item.placeholder ? item.placeholder : null}
        ref={(e) => {
          register(e, { required: item.required });
        }}
      />
      {errors[item.name] && <span>{errors[item.name].message}</span>}
      {<span>{handleError(item.name)}</span>}
    </div>
  ));

  return (
    <div className="register">
      <h2>Zarejestruj się </h2>
      <form
        className="register-form"
        onSubmit={handleSubmit(props.handleRegister)}
      >
        {props.messageRegister && <div className="message"><p>{props.messageRegister}</p></div>}
        {registerList}
        <button type="submit">Utwórz konto</button>
      </form>
    </div>
  );
};

export default RegisterPage;
