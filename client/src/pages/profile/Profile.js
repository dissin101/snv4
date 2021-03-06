import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { ProfileInfo, ProfileSettings } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import "./profile.scss";

const Profile = (props) => {
  const [profileInfo, setProfileInfo] = useState([]);
  const usrData = JSON.parse(localStorage.getItem("userData"));
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/profile/me", {
      method: "GET",
      headers: {
        "x-auth-token": usrData.token,
      },
    })
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setProfileInfo(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [setProfileInfo]);

  if (profileInfo.msg === "Token is not valid") {
    toast.warn("Время сессии истекло, повторите авторизацию.");
    auth.logout();
    history.push("/login");
  }

  function ProfileTabs(props) {
    if (props.route === "me") {
      return <ProfileInfo value={props.profileInfo} />;
    } else if (props.route === "settings") {
      return <ProfileSettings value={props.profileInfo} />;
    }
  }
  if (error) {
    return <div className='mt-3'>Ошибка: {error.message}</div>;
  } else if (isLoaded === false) {
    return <div className='mt-3'>Загрузка...</div>;
  } else {
    return (
      <div className='emp-profile border'>
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
        <div className='row'>
          <div className='col-md-4'>
            <div className='profile-img'>
              <img
                src='https://sun9-14.userapi.com/c206528/v206528135/f6dc9/S4EzUF9UDaE.jpg'
                alt='profile img'
              />
            </div>
          </div>
          <div className='col-md-8'>
            <div className='profile-head'>
              <h5>{`${profileInfo.name} ${profileInfo.surname}`}</h5>
            </div>
            <div className='add-container border'>Блок рекламы</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='profile-work'>
              <p>Параметры аккаунта</p>
              <Link to='/profile/me'>Мой профиль</Link>
              <br />
              <Link to='/profile/publications'>Мои публикации</Link>
              <br />
              <Link to='/profile/settings'>Настройки</Link>
            </div>
          </div>
          <div className='col-md-8 mt-5'>
            <div className='tab-content profile-tab' id='myTabContent'>
              <ProfileTabs route={props.value} profileInfo={profileInfo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
