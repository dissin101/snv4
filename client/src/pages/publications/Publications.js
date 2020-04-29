import React, { useState, useEffect } from "react";
import { Publication } from "../../components";
import { Filter } from "../../components";

const Publications = ({ value }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch(`/api/${value}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setPublications(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [value, setPublications]);

  const [cityFilter, setCityFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState(null);
  const [rentTypeFilter, setRentTypeFilter] = useState("");
  const [roomsFilter, setRoomsFilter] = useState("");

  function filterCity(value) {
    if (cityFilter === "") return value.city;
    if (cityFilter === value.city) return value.city;
  }

  function filterType(value) {
    if (rentTypeFilter === "") return value.type;
    if (rentTypeFilter === value.type) return value.type;
  }

  function filterRooms(value) {
    console.log("1", typeof roomsFilter);
    console.log(typeof value.rooms.toString());
    if (roomsFilter === "") return value.rooms;
    if (roomsFilter === value.rooms.toString()) return value.rooms;
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
    .filter(filterRooms)
    .filter(filterMinPrice)
    .filter(filterMaxPrice);

  const showPublication = filterPublications.map((publication) => {
    const publicationCard = (
      <Publication params={publication} key={publication._id} />
    );

    return publicationCard;
  });

  if (error) {
    return <div className='mt-3'>Ошибка: {error.message}</div>;
  } else if (isLoaded === false) {
    return <div className='mt-3'>Загрузка...</div>;
  } else {
    if (publications.length === 0) {
      return <div className='mt-3'>Публикаций пока нет.</div>;
    }

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
  }
};

export default Publications;
