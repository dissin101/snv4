import React, { useState, useEffect } from "react";
import { Publication } from "../../components";
import { Filter } from "../../components";

const Publications = ({ value }) => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch(`/${value}`)
      .then((response) => response.json())
      .then((data) => {
        setPublications(data);
      });
  }, [value, setPublications]);

  const [cityFilter, setCityFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState(null);
  const [rentTypeFilter, setRentTypeFilter] = useState("");
  const [roomsFilter, setRoomsFilter] = useState(null);

  if (publications.length === 0) {
    return <div className='mt-3'>Загрузка...</div>;
  }

  function filterCity(value) {
    if (cityFilter === "") return value.city;
    if (cityFilter === value.city) return value.city;
  }

  function filterType(value) {
    if (rentTypeFilter === "") return value.type;
    if (rentTypeFilter === value.type) return value.type;
  }

  function filterRooms(value) {
    if (roomsFilter == null) return value.rooms;
    if (roomsFilter === value.rooms) return value.rooms;
  }

  function filterMinPrice(value) {
    if (minPriceFilter == null) return value.price;
    if (minPriceFilter <= value.price) return value.price;
  }

  function filterMaxPrice(value) {
    if (maxPriceFilter == null) return value.price;
    if (maxPriceFilter >= value.price) return value.price;
  }

  const filterPublications = publications
    .filter(filterCity)
    .filter(filterType)
    .filter(filterMinPrice)
    .filter(filterMaxPrice)
    .filter(filterRooms);
  /*
    .filter(filterRooms)
    .filter(filterMinPrice)
    .filter(filterMaxPrice);
    */
  const showPublication = filterPublications.map((publication) => {
    const publicationCard = (
      <Publication
        key={publication._id}
        id={publication._id}
        type={publication.type}
        city={publication.city}
        floor={publication.floor}
        floorsInBuilding={publication.floorsInBuilding}
        area={publication.area}
        price={publication.price}
        images={publication.images}
        rooms={publication.rooms}
        //area={publication.area}
        address={publication.address}
      />
    );

    return publicationCard;
  });

  return (
    <div className='publications-wrapper'>
      <Filter
        setCityFilter={setCityFilter}
        setMinPriceFilter={setMinPriceFilter}
        setMaxPriceFilter={setMaxPriceFilter}
        setRentTypeFilter={setRentTypeFilter}
        setRoomsFilter={setRoomsFilter}
      />
      <div className='all-publications'>{showPublication}</div>
    </div>
  );
};

export default Publications;
