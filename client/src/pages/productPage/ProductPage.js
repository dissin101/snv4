import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";

import "./productPage.scss";

const ProductPage = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [publication, setPublication] = useState({
    _id: "",
    address: "",
    area: "",
    author: "",
    category: "",
    city: "",
    dateOfBuild: "",
    description: "",
    floor: "",
    floorsInBuilding: "",
    images: [],
    price: "",
    rooms: "",
    type: "",
    msg: "",
  });
  console.log(publication);

  useEffect(() => {
    fetch(`/api${props.location.pathname}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setPublication(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [props.location.pathname]);

  if (error) {
    return <div className='mt-3'>Ошибка: {error.message}</div>;
  } else if (isLoaded === false) {
    return <div className='mt-3'>Загрузка...</div>;
  } else {
    if (publication.msg === "Publication not found") {
      return <div className='mt-3'>Публикация не найдена.</div>;
    }

    return (
      <div className='product-card border rounded mt-5 mb-5 pt-4 pr-3 pl-3 pb-4'>
        <div key={publication.id}>
          <div class='container' key={publication.id}>
            <h4 className='border-bottom pb-4 mt-1 mb-4'>
              {publication.rooms}-комн. {publication.type.toLowerCase()},
              площадь {publication.area} м<sup>2</sup>, улица{" "}
              {publication.address}.
            </h4>
            <Carousel showArrows='false'>
              {publication.images.map((image) => (
                <div>
                  <img src={image.image} alt='Publication img' />
                </div>
              ))}
            </Carousel>
            <div className='row'>
              <div className='responsive-table mb-4'>
                <div className='border table-wrapper'>
                  <div className='table-block t-head'>
                    <p>Категория</p>
                  </div>
                  <div className='table-block t-body'>
                    <p>{publication.category}</p>
                  </div>
                </div>

                <div className='border-top border-bottom border-right table-wrapper'>
                  <div className='table-block t-head'>
                    <p>Город</p>
                  </div>
                  <div className='table-block t-body'>
                    <p>{publication.city}</p>
                  </div>
                </div>

                <div className='border-top border-bottom border-right table-wrapper'>
                  <div className='table-block t-head'>
                    <p>Тип</p>
                  </div>
                  <div className='table-block t-body'>
                    <p>{publication.type}</p>
                  </div>
                </div>

                <div className='border-top border-bottom border-right table-wrapper'>
                  <div className='table-block t-head'>
                    <p>Комнаты</p>
                  </div>
                  <div className='table-block t-body'>
                    <p>{publication.rooms}</p>
                  </div>
                </div>

                <div className='border-top border-bottom border-right table-wrapper'>
                  <div className='table-block t-head'>
                    <p>Этаж</p>
                  </div>
                  <div className='table-block t-body'>
                    {publication.floor}{" "}
                    {publication.floorsInBuilding > 1 && (
                      <span>/ {publication.floorsInBuilding}</span>
                    )}
                    <p></p>
                  </div>
                </div>

                <div className='border-top border-bottom border-right table-wrapper'>
                  <div className='table-block t-head date-of-build'>
                    <p>Год постройки</p>
                  </div>
                  <div className='table-block t-body date-of-build'>
                    <p>{publication.dateOfBuild}</p>
                  </div>
                </div>

                <div className='border-top border-bottom border-right table-wrapper'>
                  <div className='table-block t-head'>
                    <p>Площадь</p>
                  </div>
                  <div className='table-block t-body'>
                    <p>{publication.area}</p>
                  </div>
                </div>

                <div className='border-top border-bottom border-right table-wrapper'>
                  <div className='table-block t-head'>
                    <p>Цена</p>
                  </div>
                  <div className='table-block t-body'>
                    <CurrencyFormat
                      value={publication.price}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    &#8376;
                    <p></p>
                  </div>
                </div>
              </div>

              <div className='product-description ml-4'>
                <Tabs>
                  <TabList>
                    <Tab>Описание</Tab>
                    <Tab>Связаться с автором</Tab>
                    <Tab>Карта</Tab>
                    <Tab>Виртуальный тур</Tab>
                  </TabList>

                  <TabPanel>
                    <p>{publication.description}</p>
                  </TabPanel>
                  <TabPanel>
                    <p>Заглушка для связи с автором публикации. </p>
                  </TabPanel>
                  <TabPanel>MAP</TabPanel>
                  <TabPanel>
                    <iframe
                      title='3D RoomTour'
                      width='100%'
                      height='600'
                      src='https://3dpanorama.spb.ru/3dtur/lss/'
                      allowfullscreen='allowfullscreen'
                    ></iframe>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductPage;
