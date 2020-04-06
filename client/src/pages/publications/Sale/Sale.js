import React from "react";
import "../publications.scss";
import { Publication, Filter } from "../../../components";

class Sale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      publications: [],
    };
  }

  componentDidMount() {
    fetch("/sale")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            publications: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, publications } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className='publications-wrapper'>
          <Filter />
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
    }
  }
}

export default Sale;
