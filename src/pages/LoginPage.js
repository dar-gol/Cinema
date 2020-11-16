import React from 'react'
import {useForm} from 'react-hook-form';

import "../styles/LoginPage.sass";

const LoginPage = (props) => {
    const { register, handleSubmit, errors} = useForm();

    return(
        <div className="login">
            <h2>Zaloguj się</h2>
            <form className="login-form" onSubmit={handleSubmit(props.handleLogin)}>
                <label htmlFor="username">Użytkownik:</label>
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
                {errors.password && <span>{errors.password.message}</span>}
                <button type="submit">Zaloguj</button>
            </form>
        </div>
    )
}

export default LoginPage;