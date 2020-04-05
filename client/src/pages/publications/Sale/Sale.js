import React from "react";
import "../publications.scss";
import { Publication } from "../../../components/Publication";

class Sale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      publications: []
    };
  }

  componentDidMount() {
    fetch("/publications/sale")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            publications: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, publications } = this.state;
    console.log(publications);
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className='publications-wrapper'>
          <h1>Объявления по продаже недвижимости</h1>
          <div className='all-publications'>
            {publications.map(publication => (
              <div>
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
