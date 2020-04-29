import React, { useState } from "react";
import "./filter.scss";

const Filter = (params) => {
  const [form, setForm] = useState({ city: "", minPrice: "", maxPrice: "" });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const [rentType, setRentType] = useState("");
  const rentHandle = (event) => {
    setRentType(event.target.value);
  };

  const [rooms, setRooms] = useState("");
  const roomsHandle = (event) => {
    setRooms(event.target.value);
  };

  const handleClick = () => {
    params.setCityFilter(form.city);
    params.setRentTypeFilter(rentType);
    if (rooms == "") {
      params.setRoomsFilter(null);
    } else {
      params.setRoomsFilter(rooms);
    }
    if (form.minPrice === "") {
      params.setMinPriceFilter(null);
    } else {
      params.setMinPriceFilter(form.minPrice);
    }
    if (form.maxPrice === "") {
      params.setMaxPriceFilter(null);
    } else {
      params.setMaxPriceFilter(form.maxPrice);
    }
  };

  const clearHandleClick = () => {
    if (form.city !== "") {
      form.city = "";
      params.setCityFilter(form.city);
    }
    if (rentType !== "") {
      setRentType("");
      params.setRentTypeFilter("");
    }
    if (rooms !== "") {
      setRooms("");
      params.setRoomsFilter("");
    }
  };
  return (
    <div className='container filter navbar-dark bg-dark'>
      <div className='city-type-wrapper'>
        <div className='city-filter mr-2'>
          <p>Город</p>
          <input
            type='text'
            id='city'
            name='city'
            className='form-control'
            value={form.city}
            onChange={changeHandler}
          />
        </div>

        <div className='type-filter mr-2'>
          <p>Тип недвижимости</p>
          <select onChange={rentHandle} value={rentType}>
            <option hidden value=' '>
              {" "}
            </option>
            <option value='Квартира'>Квартира</option>
            <option value='Дом'>Дом</option>
            <option value='Коммерческая'>Коммерческая</option>
            <option value='Другое'>Другое</option> {/*!!!!! Доделать */}
          </select>
        </div>
      </div>
      <div className='rooms-price-wrapper'>
        <div className='rooms-filter mr-2'>
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
        </div>

        <div className='price-filter mr-2'>
          <p>Цена</p>
          <div>
            <input
              placeholder='От'
              type='number'
              id='minPrice'
              name='minPrice'
              className='form-control'
              value={form.minPrice}
              onChange={changeHandler}
            ></input>
            <span> - </span>
            <input
              placeholder='До'
              type='number'
              id='maxPrice'
              name='maxPrice'
              className='form-control'
              value={form.maxPrice}
              onChange={changeHandler}
            ></input>
          </div>
        </div>
      </div>

      <div className='filter-buttons'>
        <div>
          <button
            type='button'
            onClick={clearHandleClick}
            className='btn btn-danger'
          >
            Сбросить
          </button>
        </div>

        <div>
          <button
            type='button'
            onClick={handleClick}
            className='btn btn-success'
          >
            Фильтр
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
