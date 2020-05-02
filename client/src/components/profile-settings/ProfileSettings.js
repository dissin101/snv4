import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { Redirect, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProfileSettings = (props) => {
  const profileInfo = props.value;
  const usrData = JSON.parse(localStorage.getItem("userData"));
  const [form, setForm] = useState({
    name: "",
    surnmae: "",
    email: "",
    phone: "",
    city: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [success, isSuccess] = useState(false);
  let history = useHistory();
  const changeButtonHadler = () => {
    fetch("/api/profile/settings", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": usrData.token,
      },
    })
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          isSuccess(true);
          //history.push("/publications");
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  if (error) {
    return <div className='mt-3'>Ошибка: {error.message}</div>;
  } else if (success) {
    setTimeout(() => {
      history.push("/publications");
    }, 2000);
    return (
      <div className='bg-success p-2'>
        <h6 className='text-white'>
          Данные успешно изменены, сейчас Вы будете перенаправлены на главную
          страницу
        </h6>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Имя</label>
          </div>
          <div className='col-md-6'>
            <input
              className='border'
              type='text'
              id='name'
              name='name'
              value={form.name}
              placeholder={profileInfo.name}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Фамилия</label>
          </div>
          <div className='col-md-6'>
            <input
              className='border'
              type='text'
              id='surname'
              name='surname'
              value={form.surname}
              placeholder={profileInfo.surname}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Email</label>
          </div>
          <div className='col-md-6'>
            <input
              className='border'
              type='email'
              id='email'
              name='email'
              value={form.email}
              placeholder={profileInfo.email}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Телефон</label>
          </div>
          <div className='col-md-6'>
            <NumberFormat
              className='border number-format'
              format='+7 (###) ###-####'
              allowEmptyFormatting
              mask='_'
              id='phone'
              name='phone'
              value={form.phone}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Город</label>
          </div>
          <div className='col-md-6'>
            <input
              className='border'
              type='text'
              id='city'
              name='city'
              value={form.city}
              placeholder={profileInfo.city ? profileInfo.city : "Не указан"}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-5'></div>
          <div className='col-md-5'>
            <button
              className='btn btn-success pt-2 pb-2 pl-4 pr-4'
              onClick={changeButtonHadler}
              disabled={isLoaded}
            >
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
