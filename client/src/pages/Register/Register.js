import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();

  const [form, setForm] = useState({
    name: "",
    surname: "",
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

  const registerHandler = async () => {
    try {
      const data = await request("/api/user/register", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className='row justify-content-center'>
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
      <div className='col-md-5'>
        <div className='card'>
          <header className='card-header'>
            <Link
              to='/login'
              className='float-right btn btn-outline-primary mt-1'
            >
              Авторизация
            </Link>
            <h5 className='card-title mt-1'>Регистрация</h5>
          </header>
          <article className='card-body'>
            <div className='form-row'>
              <div className='col form-group'>
                <label htmlFor='name'>Имя </label>

                <input
                  placeholder='Иван'
                  id='name'
                  type='text'
                  name='name'
                  className='form-control'
                  value={form.name}
                  onChange={changeHandler}
                />
              </div>
              <div className='col form-group'>
                <label htmlFor='surname'>Фамилия</label>

                <input
                  placeholder='Иванов'
                  id='surname'
                  type='text'
                  name='surname'
                  className='form-control'
                  value={form.surname}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>

              <input
                placeholder='mail@example.com'
                id='email'
                type='text'
                name='email'
                className='form-control'
                value={form.email}
                onChange={changeHandler}
              />
            </div>
            <div className='form-group'>
              <label>Придумайте пароль</label>

              <input
                placeholder='******'
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
                type='submit'
                className='btn btn-primary btn-block'
                onClick={registerHandler}
                disabled={loading}
              >
                Зарегистрироваться
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Register;
