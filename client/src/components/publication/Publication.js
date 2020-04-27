import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

import "./publication.scss";

const Publication = ({
  id,
  type,
  city,
  floor,
  floorsInBuilding,
  price,
  images,
  rooms,
  area,
  address,
}) => {
  const { url } = useRouteMatch();

  return (
    <div className='publication-wrapper card rounded'>
      <div className='pictures-wrapper'>
        <img src={images[0].image} alt='first_image' />
        <img src={images[1].image} alt='second_image' />
        <img src={images[2].image} alt='second_image' />
        <div className='publication-description'>
          <h1>
            {rooms}-комн. {type.toLowerCase()}, {area} м<sup>2</sup>, {address}
          </h1>
          <p>Категория: {type}</p>
          <p>Город: {city}</p>
          <p>
            Цена:{" "}
            <CurrencyFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
            />
            &#8376;
          </p>
          {type === "Квартиры" && (
            <p>
              Этаж: {floor}/{floorsInBuilding}
            </p>
          )}
          <Link to={`${url}/${id}`}>Подробнее</Link>
        </div>
      </div>
    </div>
  );
};

export default Publication;
