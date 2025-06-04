import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { IUserRequest } from '../../@types/IUser';
import { useAuth } from '../../hooks/useAuth';
import './styles.scss';
//import { Logo } from '../../components/Logo';

export const Login = () => {
  const [formData, setFormData] = React.useState({} as IUserRequest);
  const { loginUser, errorMessage } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    loginUser(formData);
  };

  useEffect(() => {
    console.table(formData);
  }, [formData]);

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {/* <div className="logo-wrapper">
          <Logo />
        </div> */}

        <h1 className="login-title">Bem-vindo de volta!</h1>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>

          <button type="submit" className="btn-submit" onClick={onSubmit}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};
