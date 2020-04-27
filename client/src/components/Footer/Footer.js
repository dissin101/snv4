import React from "react";
import "./footer.scss";
import { NavLink, Link } from "react-router-dom";

const Footer = () => (
  <footer className='footer bg-dark'>
    <div className='container bottom_border'>
      <div className='row'>
        <div className=' col-sm-4 col-md col-sm-4  col-12 col'>
          <h5 className='headin5_amrc col_white_amrc pt2'>Связаться с нами</h5>
          <p className='mb10'>Наша команда бла бла бла...</p>
          <p>
            <i className='fa fa-location-arrow' /> г. Караганда, ул.
            Академическая 9{" "}
          </p>
          <p>
            <i className='fa fa-phone' /> +7(708)-535-75-22{" "}
          </p>
          <p>
            <i className='fa fa fa-envelope' /> dissin101@gmail.com{" "}
          </p>
        </div>

        <div className=' col-sm-4 col-md  col-6 col'>
          <h5 className='headin5_amrc col_white_amrc pt2'>Полезные ссылки</h5>
          <ul className='footer_ul_amrc'>
            <li>
              <Link to='/login'>Авторизация</Link>
            </li>
            <li>
              <Link to='/registration'>Регистрация</Link>
            </li>
            <li>
              <Link to='#'>Восстановить пароль</Link>
            </li>
            <li>
              <Link to='/personal-panel'>Личный кабинет</Link>
            </li>
            <li>
              <Link to='/my-publications'>Мои публикации</Link>
            </li>
          </ul>
        </div>

        <div className=' col-sm-4 col-md  col-6 col'>
          <h5 className='headin5_amrc col_white_amrc pt2'>Полезные ссылки</h5>
          <ul className='footer_ul_amrc'>
            <li>
              <a href='/?'>Помощь и Обратная связь</a>
            </li>
            <li>
              <a href='/?'>Реклама на сайте</a>
            </li>
            <li>
              <a href='/?'>Сотрудничество</a>
            </li>
            <li>
              <a href='/?'>Условия использования</a>
            </li>
            <li>
              <a href='/?'>Как продавать и покупать?</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className='container'>
      <ul className='foote_bottom_ul_amrc'>
        <li>
          <NavLink to='/'>Главная</NavLink>
        </li>
        <li>
          <NavLink to='/publications'>Все объявления</NavLink>
        </li>
        <li>
          <NavLink to='/sale'>Продажа</NavLink>
        </li>
        <li>
          <NavLink to='/rent'>Аренда</NavLink>
        </li>
        <li>
          <NavLink to='/add-publication'>Подать объявление</NavLink>
        </li>
        <li>
          <NavLink to='/'>Связаться с нами</NavLink>
        </li>
      </ul>
      <p className='text-center'>
        2020 | Designed by{" "}
        <a href='https://vk.com/bkirillv'>Bushmanov Kirill</a>
      </p>
    </div>
  </footer>
);

export default Footer;
