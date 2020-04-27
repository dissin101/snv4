import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    if (error !== "" && error !== null) toast.error(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
      />
      <div className='row justify-content-center'>
        <div className='col-md-5'>
          <div className='card mt-5'>
            <article className='card-body'>
              <Link
                to='/register'
                className='float-right btn btn-outline-primary'
              >
                Зарегистрироваться
              </Link>
              <h4 className='card-title mb-4 mt-1'>Авторизация</h4>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>

                <input
                  placeholder='Введите Email'
                  id='email'
                  type='text'
                  name='email'
                  className='form-control'
                  value={form.email}
                  onChange={changeHandler}
                />
              </div>
              <div className='form-group'>
                <a className='float-right' href='#!'>
                  Забыли пароль?
                </a>

                <label htmlFor='password'>Пароль</label>
                <input
                  placeholder='Введите пароль'
                  id='password'
                  type='password'
                  name='password'
                  className='form-control'
                  value={form.password}
                  onChange={changeHandler}
                />
              </div>
              <div className='form-group'>
                <button
                  className='btn btn-primary btn-block'
                  onClick={loginHandler}
                  disabled={loading}
                >
                  Авторизоваться
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
