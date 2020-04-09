import React, { useState, useEffect } from "react";
import { Publication } from "../../../components";

const Sale = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch("/sale")
      .then((response) => response.json())
      .then((data) => {
        setPublications(data);
      });
  }, []);

  return (
    <div className='publications-wrapper'>
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
