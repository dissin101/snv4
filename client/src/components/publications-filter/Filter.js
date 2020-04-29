import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
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
    if (rooms === "") {
      params.setRoomsFilter("");
    } else {
      params.setRoomsFilter(rooms);
    }
    if (form.minPrice === "") {
      params.setMinPriceFilter(null);
    } else {
      for (let a = 0; a <= form.minPrice.length; a++) {
        if (form.minPrice[a] === ",") {
          form.minPrice = form.minPrice.replace(/,/, "");
        }
      }
      form.price = Number(form.minPrice);
      params.setMinPriceFilter(form.minPrice);
    }
    if (form.maxPrice === "") {
      params.setMaxPriceFilter(null);
    } else {
      for (let a = 0; a <= form.maxPrice.length; a++) {
        if (form.maxPrice[a] === ",") {
          form.maxPrice = form.maxPrice.replace(/,/, "");
        }
      }
      form.price = Number(form.maxPrice);
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

    if (form.minPrice != null) {
      form.minPrice = "";
      params.setMinPriceFilter(null);
    }

    if (form.maxPrice != null) {
      form.maxPrice = "";
      params.setMaxPriceFilter(null);
    }

    // PRICE
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
            <CurrencyFormat
              placeholder='От'
              thousandSeparator={true}
              id='minPrice'
              name='minPrice'
              value={form.minPrice}
              onChange={changeHandler}
            />
            <span> - </span>
            <CurrencyFormat
              placeholder='До'
              thousandSeparator={true}
              id='maxPrice'
              name='maxPrice'
              value={form.maxPrice}
              onChange={changeHandler}
            />
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
