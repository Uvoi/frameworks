import React, { useState } from 'react';
import './styles.css';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../utils/auth';
import { setToken } from '../../store/authSlice';
import { useNavigate } from 'react-router';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginToggle = (login: boolean) => {
    setIsLogin(login);
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Submitting:', { isLogin, email, password, username }); // Отладка

    if (isLogin) {
      const response = await loginUser(email, password);
      console.log('Login response:', response); // Отладка

      if ('data' in response && response.status === 200) {
        dispatch(setToken(response.data.token));
        setError('');
        navigate('/dashboard');
      } else if ('status' in response) {
        if (response.status === 401) {
          setError('Неверные данные почты или пароля');
        } else if (response.status === 469 || response.status >= 500) {
          setError('Произошла неизвестная ошибка');
        }
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } else {
      const response = await registerUser(username, email, password);
      console.log('Register response:', response); // Отладка

      if ('data' in response && response.status === 200) {
        dispatch(setToken(response.data.token));
        setError('');
        navigate('/dashboard'); // Перенаправление после регистрации
      } else if ('status' in response) {
        if (response.status === 409) {
          setError('Пользователь с таким email уже зарегистрирован');
        } else if (response.status === 469 || response.status >= 500) {
          setError('Произошла неизвестная ошибка');
        }
      } else {
        setError('Произошла неизвестная ошибка');
      }
    }
  };

  return (
    <div className="Login flex justify-center flex-col items-center">
      <div className="text-2xl flex w-1/2 justify-evenly">
        <button
          className={`cursor-pointer border-b-2 border-transparent group ${
            isLogin && 'text-accent'
          } hover:border-accent transition-all duration-300`}
          onClick={() => handleLoginToggle(true)}
        >
          вход
        </button>
        <span>/</span>
        <button
          className={`cursor-pointer border-b-2 border-transparent group ${
            !isLogin && 'text-accent'
          } hover:border-accent transition-all duration-300`}
          onClick={() => handleLoginToggle(false)}
        >
          регистрация
        </button>
      </div>

      <form className="log_reg_form" id="log_reg_form" onSubmit={handleSubmitLogin}>
        {!isLogin && (
          <input
            type="text"
            placeholder="name"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="email"
          value={email} // Добавили value
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password} // Добавили value
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </form>

      <button
        form="log_reg_form"
        className="w-[30%] cursor-pointer bg-accent px-3 pt-1.5 pb-2.5 text-xl rounded-xl hover:bg-accent-100"
      >
        {isLogin ? 'войти' : 'зарегистрироваться'}
      </button>
      <span className="mt-10 text-secondary">{error}</span>
    </div>
  );
};

export default Login;