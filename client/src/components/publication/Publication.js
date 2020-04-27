import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

import "./publication.scss";

const Publication = ({ params }) => {
  const { url } = useRouteMatch();

  return (
    <div className='publication-wrapper card rounded'>
      <div className='pictures-wrapper'>
        <img src={params.images[0].image} alt='first_image' />
        <img src={params.images[1].image} alt='second_image' />
        <img src={params.images[2].image} alt='second_image' />
        <div className='publication-description'>
          <h1>
            {params.rooms}-комн. {params.type.toLowerCase()}, {params.area} м
            <sup>2</sup>, {params.address}
          </h1>
          <p>Категория: {params.type}</p>
          <p>Город: {params.city}</p>
          <p>
            Цена:{" "}
            <CurrencyFormat
              value={params.price}
              displayType={"text"}
              thousandSeparator={true}
            />
            &#8376;
          </p>
          {params.type === "Квартиры" && (
            <p>
              Этаж: {params.floor}/{params.floorsInBuilding}
            </p>
          )}
          <Link to={`${url}/${params._id}`}>Подробнее</Link>
        </div>
      </div>
    </div>
  );
};

export default Publication;
