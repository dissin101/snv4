import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./profile.scss";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState([]);
  const usrData = JSON.parse(localStorage.getItem("userData"));
  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch("/profile/me", {
      method: "GET",
      headers: {
        "x-auth-token": usrData.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileInfo(data);
      });
  }, [setProfileInfo]);

  if (profileInfo.msg == "Token is not valid") {
    alert("Время сессии истекло, повторите авторизацию.");
    auth.logout();
    history.push("/");
  }

  if (profileInfo.length == 0) {
    return <div className='mt-3'>Загрузка...</div>;
  }

  return (
    <div className='emp-profile border'>
      <div className='row'>
        <div className='col-md-3'>
          <div className='profile-img'>
            <img
              src='https://sun9-14.userapi.com/c206528/v206528135/f6dc9/S4EzUF9UDaE.jpg'
              alt='profile img'
            />
          </div>
        </div>
        <div className='col-md-9'>
          <div className='profile-head'>
            <h5>{`${profileInfo.name} ${profileInfo.surname} `}</h5>
          </div>
          <div className='add-container border'>Блок рекламы</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <div className='profile-work'>
            <p>Параметры аккаунта</p>
            <a href=''>Мой профиль</a>
            <br />
            <a href=''>Мои публикации</a>
            <br />
            <a href=''>Настройки</a>
          </div>
        </div>
        <div className='col-md-8 mt-5'>
          <div className='tab-content profile-tab' id='myTabContent'>
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
                {profileInfo.phone ? profileInfo.phone : <p>Не указан</p>}
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
      </div>
    </div>
  );
};

export default Profile;
