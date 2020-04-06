import React, { useState } from "react";

const Filter = () => {
  const [rentType] = useState(["", "Квартира", "Дом", "Коммерческая"]);

  const Type = rentType.map((Type) => Type);

  const handleRentTypeChange = (e) => {
    console.log(rentType[e.target.value]);
  };

  const [roomsCount] = useState([
    "",
    "1-комнатная",
    "2-комнатная",
    "3-комнатная",
    "4-комнатная",
  ]);

  const Rooms = roomsCount.map((Rooms) => Rooms);

  const handleRoomsCountChange = (e) => {
    console.log(roomsCount[e.target.value]);
  };

  return (
    <div className='container navbar-dark bg-dark'>
      <div className='row'>
        <div className='col col-sm-3 city-filter'>
          <p>Город</p>
          <input type='text' />
        </div>

        <div className='col'>
          <p>Тип недвижимости</p>
          <select onChange={(e) => handleRentTypeChange(e)}>
            {Type.map((type, key) => (
              <option key={key} value={key}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className='col'>
          <p>Количество комнат</p>
          <select onChange={(e) => handleRoomsCountChange(e)}>
            {Rooms.map((type, key) => (
              <option key={key} value={key}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className='col col-sm-4 price-filter'>
          <p>Цена</p>
          <input placeholder='От' type='number'></input>
          <span> - </span>
          <input placeholder='До' type='number'></input>
        </div>

        <div className='col col-sm-1'>
          <button className='btn btn-danger'>Фильтр</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
