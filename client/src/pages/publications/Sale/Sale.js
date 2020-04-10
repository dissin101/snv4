import React, { useState, useEffect } from "react";
import { Publication } from "../../../components";
import { Filter } from "../../../components";

const Sale = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch("/sale")
      .then((response) => response.json())
      .then((data) => {
        setPublications(data);
      });
  }, []);

  const [cityFilter, setCityFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState(null);
  const [rentTypeFilter, setRentTypeFilter] = useState("");
  const [roomsFilter, setRoomsFilter] = useState(null);
  console.log(roomsFilter);

  if (publications.length === 0) {
    return <div className='mt-3'>Загрузка...</div>;
  }

  function filterCity(value) {
    if (cityFilter === "") {
      return value.city;
    } else if (cityFilter === value.city) {
      return value.city;
    }
  }

  function filterType(value) {
    if (rentTypeFilter === "") {
      //console.log(value.type);
      return value.type;
    } else if (rentTypeFilter === value.type) {
      return value.type;
    }
  }

  function filterRooms(value) {
    if (roomsFilter === null) {
      return value.rooms;
    } else if (roomsFilter === value.rooms) {
      return value.rooms;
    }
  }

  const filterPublications = publications.filter(filterCity).filter(filterType);

  //console.log(filterPublications);

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
        area={publication.area}
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

/*
  const showPublication = publications.map((publication) => {
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
        area={publication.area}
        address={publication.address}
      />
    );

    return publicationCard;
  });
  console.log(showPublication);

  <div className='all-publications'>{showPublication}</div>


    const filterPublications = publications
    .filter((publ) => publ.city === cityFilter)
    .filter((publ) => publ.price >= minPriceFilter)
    .filter((publ) => publ.price <= maxPriceFilter)
    .filter((publ) => publ.type === rentTypeFilter)
    .filter((publ) => publ.rooms === roomsFilter);

  
  */

export default Sale;
