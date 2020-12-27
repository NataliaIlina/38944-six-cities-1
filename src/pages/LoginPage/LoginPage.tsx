import React, { useState } from 'react';
import { Layout } from 'src/containers';
import { Redirect } from 'react-router-dom';
import { Link } from 'src/components';
import { BASE_URL } from 'src/constants';
import { useDispatch, useSelector } from 'src/store';
import { authorizeUser } from 'src/ducks/auth/auth';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isUserAuth = useSelector((state) => state.auth.isUserAuth);

  return isUserAuth ? (
    <Redirect to={BASE_URL} />
  ) : (
    <Layout type="login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              autoComplete="off"
              action="#"
              method="post"
              onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
                e.preventDefault();
                dispatch(authorizeUser({ email, password }));
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default LoginPage;
