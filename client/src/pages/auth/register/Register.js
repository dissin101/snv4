import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useHttp } from "../../../hooks/http.hook";
import { useMessage } from "../../../hooks/message.hook";

const Register = () => {
  return (
    <div className='row justify-content-center'>
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
                  <label>Имя </label>
                  <input type='text' className='form-control' placeholder='Иван' />
                </div>
                <div className='col form-group'>
                  <label>Фамилия</label>
                  <input type='text' className='form-control' placeholder='Иванов' />
                </div>
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input type='email' className='form-control' placeholder='mail@example.com' />
              </div>
              <div className='form-group'>
                <label>Придумайте пароль</label>
                <input className='form-control' type='password' placeholder="******" />
              </div>
              <div className='form-group'>
                <label>Повторите пароль</label>
                <input className='form-control' type='password' placeholder="******" />
              </div>
              <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                  {" "}
                  Зарегистрироваться{" "}
                </button>
              </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Register;
