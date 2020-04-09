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

  if (publications.length === 0) {
    return <div className='mt-3'>Загрузка...</div>;
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
      <div className='all-publications'>
        {publications.map((publication) => (
          <div key={publication._id}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sale;
