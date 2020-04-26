import React, { Fragment, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
//
const Navbar = (isAuthenticated) => {
  const isAuth = isAuthenticated.value.isAuthenticated;
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <Fragment>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-info'>
        <NavLink className='navbar-brand' to='/publications'>
          Недвижимость
        </NavLink>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <NavLink exact to='/publications' className='nav-link'>
                Все объявления
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/sale' className='nav-link'>
                Продажа
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/rent' className='nav-link'>
                Аренда
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/add-publication' className='nav-link'>
                Опубликовать объявление
              </NavLink>
            </li>
          </ul>
          {isAuth ? (
            <div className='form-inline my-2 my-lg-0'>
              <NavLink
                to='/profile/me'
                className='btn btn-info my-2 mr-2 my-sm-0'
              >
                Личный кабинет
              </NavLink>
              <NavLink
                to='logout'
                onClick={logoutHandler}
                className='btn btn-danger my-2 mr-2 my-sm-0'
              >
                Выйти
              </NavLink>
            </div>
          ) : (
            <div>
              <form className='form-inline my-2 my-lg-0'>
                <NavLink to='/login' className='btn btn-info my-2 mr-2 my-sm-0'>
                  Авторизация
                </NavLink>
                <NavLink
                  to='/register'
                  className='btn btn-primary my-2 my-sm-0'
                >
                  Регистрация
                </NavLink>
              </form>
            </div>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
