import React from "react";

const ProfileSettings = (props) => {
  const profileInfo = props.value;
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
              placeholder={profileInfo.name}
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
              placeholder={profileInfo.surname}
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
              placeholder={profileInfo.email}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Телефон</label>
          </div>
          <div className='col-md-6'>
            <input
              className='border'
              type='text'
              placeholder={profileInfo.phone ? profileInfo.phone : "Не указан"}
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
              placeholder={profileInfo.city ? profileInfo.city : "Не указан"}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-3'>
            <button className='btn btn-success'>Изменить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
