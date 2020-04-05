import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./productPage.scss";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      publication: []
    };
  }

  componentDidMount() {
    const url = this.props.match.url;
    console.log(url);
    fetch(`${url}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            publication: result
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
    const { error, isLoaded, publication } = this.state;
    console.log(publication);
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className='product-card border rounded mt-5 mb-5 pt-4 pr-3 pl-3 pb-4'>
          <div>
            <div class='container'>
              <h1 className='border-bottom pb-4 mt-1 mb-4'>
                Заглушка описания
                {/*publications[ID].mainInfo*/}
              </h1>
              <Carousel>
                {publication.images.map(image => (
                  <div>
                    <img src={image.image} />
                  </div>
                ))}
                {/* <p className="legend">Legend 1</p> */}
              </Carousel>
              <div class='row'>
                <div class='span12'>
                  <table class='table table-condensed table-hover'>
                    <tbody>
                      <tr>
                        <td>Город</td>
                        <td>{publication.city}</td>
                      </tr>
                      <tr>
                        <td>Число комнат</td>
                        <td>VALUE</td>
                      </tr>
                      <tr>
                        <td>Этаж</td>
                        <td>
                          {publication.floor} / {publication.floorInBuilding}
                        </td>
                      </tr>
                      <tr>
                        <td>Год постройки</td>
                        <td>{publication.dateOfBuild}</td>
                      </tr>
                      <tr>
                        <td>Площадь</td>
                        <td>{publication.area}</td>
                      </tr>
                      <tr>
                        <td>Стоимость</td>
                        <td>{publication.price}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='product-description ml-4'>
                  <h1 className='mt-2'>Связаться с автором публикации</h1>
                  <h1 className='mt-2'>Описание</h1>
                  <p>{publication.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ProductPage;
