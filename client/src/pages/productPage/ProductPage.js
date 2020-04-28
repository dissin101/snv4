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
  }, []);

  if (error) {
    return <div className='mt-3'>Ошибка: {error.message}</div>;
  } else if (isLoaded === false) {
    return <div className='mt-3'>Загрузка...</div>;
  } else {
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
              <div class='table-responsive' id='sailorTableArea'>
                <table
                  id='sailorTable'
                  class='table table-striped table-bordered'
                  width='100%'
                >
                  <thead>
                    <tr>
                      <th>Категория</th>
                      <th>Город</th>
                      <th>Тип</th>
                      <th>Число комнат</th>
                      <th>Этаж</th>
                      <th>Год постройки</th>
                      <th>Площадь</th>
                      <th>Стоимость</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{publication.category}</td>
                      <td>{publication.city}</td>
                      <td>{publication.type}</td>
                      <td>{publication.rooms}</td>
                      <td>
                        {publication.floor}{" "}
                        {publication.floorsInBuilding > 1 && (
                          <span>/ {publication.floorsInBuilding}</span>
                        )}
                      </td>
                      <td>{publication.dateOfBuild}</td>
                      <td>{publication.area}</td>
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
