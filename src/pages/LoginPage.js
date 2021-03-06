import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

import UserContext from '../Context/UserContext';

import '../styles/Page/LoginPage.sass';
import '../styles/Form.sass';

const LoginItem = [
  {
    id: 'email',
    type: 'text',
    name: 'email',
    label: 'Email: ',
    placeholder: 'Wpisz e-mail...',
    required: 'E-mail jest wymagany!',
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Hasło: ',
    placeholder: 'Wpisz hasło...',
    required: 'Hasło jest wymagane!',
  },
];

const LoginPage = ({ handleLogin, failedLogin }) => {
  const { register, handleSubmit, errors } = useForm();
  const { isUserLogged } = useContext(UserContext);

  if (isUserLogged) {
    return <Redirect to="/" />;
  }

  return (
    <div className="wrapper-form">
      <h2>ZALOGUJ SIĘ</h2>
      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        {failedLogin && (
          <div className="message">
            <p>Nieprawidłowy e-mail lub hasło.</p>
          </div>
        )}
        {LoginItem.map((item) => (
          <div key={item.id} className="input-item">
            <label htmlFor={item.id}>
              <span className="label login-label">{item.label}</span>
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
            </label>
            <div>
              {errors[item.name] && (
                <span className="error">{errors[item.name].message}</span>
              )}
            </div>
          </div>
        ))}
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default LoginPage;
