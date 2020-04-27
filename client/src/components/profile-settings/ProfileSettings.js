import React, { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import NumberFormat from "react-number-format";

const ProfileSettings = (props) => {
  const profileInfo = props.value;
  const { loading, request } = useHttp();
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

  const changeButtonHadler = async () => {
    try {
      await request(
        "/api/profile/settings",
        "POST",
        { ...form },
        { "x-auth-token": usrData.token }
      );
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-md-12 bg-warning p-2 ml-1 mb-3'>
            <span>
              Внимание! Обновленная информация будет видна только после
              перезагрузки страницы!
            </span>
          </div>
        </div>
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
              disabled={loading}
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
