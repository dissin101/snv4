import React from "react";
//import { useParams } from "react-router-dom";
//import { publications } from "../../constants";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
//import currencyFormatter from "currency-formatter";

import "./productPage.scss";

const ProductPage = () => {
  //const { id } = useParams();
  //const ID = id - 1;

  return (
    <div className='product-card border rounded mt-5 mb-5 pt-4 pr-3 pl-3 pb-4'>
      <div>
        <div class='container'>
          <h1 className='border-bottom pb-4 mt-1 mb-4'>
            {/*publications[ID].mainInfo*/}
          </h1>
          <Carousel>
            <div>
              <img src='https://remont-f.ru/upload/iblock/7aa/disayn-kvartiry-2018-0.jpg' />
              {/* <p className="legend">Legend 1</p> */}
            </div>
          </Carousel>
          <div class='row'>
            <div class='span12'>
              <table class='table table-condensed table-hover'>
                <tbody>
                  <tr>
                    <td>Город</td>
                    <td>VALUE</td>
                  </tr>
                  <tr>
                    <td>Число комнат</td>
                    <td>VALUE</td>
                  </tr>
                  <tr>
                    <td>Этаж</td>
                    <td>VALUE</td>
                  </tr>
                  <tr>
                    <td>Год постройки</td>
                    <td>VALUE</td>
                  </tr>
                  <tr>
                    <td>Площадь</td>
                    <td>VALUE</td>
                  </tr>
                  <tr>
                    <td>Стоимость</td>
                    <td>VALUE</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='product-description ml-4'>
              <h1 className='mt-2'>Связаться с автором публикации</h1>
              <h1 className='mt-2'>Описание</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
