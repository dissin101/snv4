import React from "react";

const ProfileInfo = (props) => {
  const profileInfo = props.value;
  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Имя</label>
          </div>
          <div className='col-md-6'>
            <p>{profileInfo.name}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Фамилия</label>
          </div>
          <div className='col-md-6'>
            <p>{profileInfo.surname}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Город</label>
          </div>
          <div className='col-md-6'>
            <p>{profileInfo.city}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Email</label>
          </div>
          <div className='col-md-6'>
            <p>{profileInfo.email}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Телефон</label>
          </div>
          <div className='col-md-6'>
            <p>{profileInfo.phone ? profileInfo.phone : <p>Не указан</p>}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <label>Число публикаций</label>
          </div>
          <div className='col-md-6'>
            {profileInfo.publications ? profileInfo.publications : <p>0</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
