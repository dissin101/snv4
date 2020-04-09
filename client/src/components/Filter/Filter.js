import React, { useState } from "react";

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
    params.setMinPriceFilter(form.minPrice);
    params.setMaxPriceFilter(form.maxPrice);
    params.setRentTypeFilter(rentType);
    params.setRoomsFilter(rooms);
  };
  return (
    <div className='container filter navbar-dark bg-dark'>
      <div className='row'>
        <div className='col col-sm-3 city-filter'>
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

        <div className='col'>
          <p>Тип недвижимости</p>
          <select onChange={rentHandle} value={rentType}>
            <option value=' '> </option>
            <option value='Квартира'>Квартира</option>
            <option value='Дом'>Дом</option>
            <option value='Коммерческая'>Коммерческая</option>
          </select>
        </div>

        <div className='col'>
          <p>Количество комнат</p>
          <select onChange={roomsHandle} value={rooms}>
            <option value=' '> </option>
            <option value='1-комнатная'>1-комнатная</option>
            <option value='2-комнатная'>2-комнатная</option>
            <option value='3-комнатная'>3-комнатная</option>
            <option value='4-комнатная'>4-комнатная</option>
          </select>
        </div>

        <div className='col col-sm-4 price-filter'>
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

        <div className='col col-sm-1'>
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
