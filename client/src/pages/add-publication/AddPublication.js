import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import "./addPublication.scss";
import CurrencyFormat from "react-currency-format";

const AddPublication = () => {
  const { loading, request } = useHttp();
  const usrData = JSON.parse(localStorage.getItem("userData"));
  const [form, setForm] = useState({
    city: "",
    address: "",
    dateOfBuild: "",
    floor: "",
    floorsInBuilding: "",
    area: "",
    price: "",
    description: "",
    type: "",
    rooms: "",
    category: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    form.type = rentType;
    form.category = category;
    form.rooms = Number(form.rooms);
    form.dateOfBuild = Number(form.dateOfBuild);
    form.floor = Number(form.floor);
    form.floorsInBuilding = Number(form.floorsInBuilding);
    form.area = Number(form.area);
    for (let a = 0; a <= form.price.length; a++) {
      if (form.price[a] === ",") {
        form.price = form.price.replace(/,/, "");
      }
    }
    form.price = Number(form.price);
    console.log(form);
  };

  const [category, setCategory] = useState("");
  const categoryHandle = (event) => {
    setCategory(event.target.value);
  };

  const [rentType, setRentType] = useState("");
  const rentHandle = (event) => {
    setRentType(event.target.value);
  };

  const [rooms, setRooms] = useState("");
  const roomsHandle = (event) => {
    setRooms(event.target.value);
  };

  return (
    <div className='border add-publication'>
      <h4 className='border-bottom pb-4 mt-1 mb-4'>Опубликовать объявление</h4>

      <div className='add-pubcliation-params-container'>
        <div className='half-wrapper'>
          <div>
            <p>Рубрика</p>
            <select
              className='border'
              onChange={categoryHandle}
              value={category}
            >
              <option hidden value=' '>
                {" "}
              </option>
              <option value='Продажа'>Продажа</option>
              <option value='Аренда'>Аренда</option>
            </select>

            <p>Тип недвижимости</p>
            <select className='border' onChange={rentHandle} value={rentType}>
              <option hidden value=' '>
                {" "}
              </option>
              <option value='Квартира'>Квартира</option>
              <option value='Дом'>Дом</option>
              <option value='Коммерческая'>Коммерческая</option>
            </select>

            <p>Количество комнат</p>
            <select onChange={roomsHandle} value={rooms}>
              <option hidden value=' '>
                {" "}
              </option>
              <option value='1'>1-комнатная</option>
              <option value='2'>2-комнатная</option>
              <option value='3'>3-комнатная</option>
              <option value='4'>4-комнатная</option>
              <option value='5'>5 и более</option> {/*!!!!! Доделать */}
            </select>

            <p>Город</p>
            <input
              className='border'
              type='text'
              placeholder='Алматы'
              id='city'
              name='city'
              value={form.city}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <p>Адрес</p>
            <input
              className='border'
              type='text'
              placeholder='пр. Абая'
              id='address'
              name='address'
              value={form.address}
              onChange={changeHandler}
            ></input>

            <p>Год постройки</p>
            <input
              className='border'
              type='number'
              placeholder='2017'
              id='dateOfBuild'
              name='dateOfBuild'
              className='form-control'
              value={form.dateOfBuild}
              onChange={changeHandler}
            ></input>

            <p>Этаж</p>
            <input
              className='border'
              type='number'
              placeholder='2'
              id='floor'
              name='floor'
              className='form-control'
              value={form.floor}
              onChange={changeHandler}
            ></input>

            <p>Этажей в здании</p>
            <input
              className='border'
              type='number'
              placeholder='2'
              id='floorsInBuilding'
              name='floorsInBuilding'
              className='form-control'
              value={form.floorsInBuilding}
              onChange={changeHandler}
            ></input>
          </div>
        </div>
        <div className='half-wrapper'>
          <div>
            <p>
              Площадь в м<sup>2</sup>
            </p>
            <input
              className='border'
              type='number'
              placeholder='50'
              id='area'
              name='area'
              className='form-control'
              value={form.area}
              onChange={changeHandler}
            ></input>

            <p>Цена</p>
            <CurrencyFormat
              placeholder='15,500,000&#8376;'
              thousandSeparator={true}
              id='price'
              name='price'
              className='form-control'
              value={form.price}
              onChange={changeHandler}
            />

            <p>Описание</p>
            <textarea
              className='input-description border'
              type='text'
              placeholder='Кратко
            опишите детали Вашего объявления.'
              maxLength='1000'
              id='description'
              name='description'
              className='form-control'
              value={form.description}
              onChange={changeHandler}
            ></textarea>

            <div className='upload-images-container'>
              <div>
                <p>Загрузить фотографии</p>
                <span>
                  Размер фотографии: 800px x 800px. Максимальный вес 4мб.
                </span>
              </div>
              <div>
                <input
                  type='file'
                  multiple
                  //onChange={this.multipleFileChangedHandler}
                />
              </div>
            </div>

            <button className='btn btn-success' onClick={handleClick}>
              Опубликовать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPublication;
