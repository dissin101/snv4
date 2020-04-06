import React from "react";
import CurrencyFormat from "react-currency-format";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { YaMap } from "../../../components";
import "react-tabs/style/react-tabs.scss";

import "./productPage.scss";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      publication: [],
    };
  }

  componentDidMount() {
    const url = this.props.match.url;
    fetch(`${url}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            publication: result,
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
                {`${publication.rooms}-комн. ${publication.type}, ${publication.area} м2, ${publication.address}`}
              </h1>
              <Carousel>
                {publication.images.map((image) => (
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
                        <td>{publication.rooms}</td>
                      </tr>
                      <tr>
                        <td>Этаж</td>
                        <td>
                          {publication.floor}{" "}
                          {publication.floorsInBuilding > 1 && (
                            <span>/ {publication.floorsInBuilding}</span>
                          )}
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
                        <td>
                          <CurrencyFormat
                            value={publication.price}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          &#8376;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='product-description ml-4'>
                  <Tabs>
                    <TabList>
                      <Tab>Описание</Tab>
                      <Tab>Связаться с автором</Tab>
                      <Tab>Карта</Tab>
                    </TabList>

                    <TabPanel>
                      <p>{publication.description}</p>
                    </TabPanel>
                    <TabPanel>
                      <h2>Any content 2</h2>
                    </TabPanel>
                    <TabPanel>
                      <YaMap />
                    </TabPanel>
                  </Tabs>
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
