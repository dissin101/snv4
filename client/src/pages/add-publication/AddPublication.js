import React from "react";
import "./addPublication.scss";
import CurrencyFormat from "react-currency-format";

const AddPublication = () => {
  return (
    <div className='border add-publication'>
      <h4 className='border-bottom pb-4 mt-1 mb-4'>Опубликовать объявление</h4>

      <div className='add-pubcliation-params-container'>
        <div className='half-wrapper'>
          <div>
            <p>Рубрика</p>
            <select className='border'>
              <option hidden value=' '>
                {" "}
              </option>
              <option value='Продажа'>Продажа</option>
              <option value='Аренда'>Аренда</option>
            </select>

            <p>Тип недвижимости</p>
            <select className='border'>
              <option hidden value=' '>
                {" "}
              </option>
              <option value='Квартира'>Квартира</option>
              <option value='Дом'>Дом</option>
              <option value='Коммерческая'>Коммерческая</option>
            </select>

            <p>Количество комнат</p>
            <select>
              <option hidden value=' '>
                {" "}
              </option>
              <option value='1'>1-комнатная</option>
              <option value='2'>2-комнатная</option>
              <option value='3'>3-комнатная</option>
              <option value='4'>4-комнатная</option>
              <option value='5'>5 и более</option> {/*!!!!! Доделать */}
            </select>

            <p>Город</p>
            <input className='border' type='text' placeholder='Алматы'></input>
          </div>
          <div>
            <p>Адрес</p>
            <input
              className='border'
              type='text'
              placeholder='пр. Абая'
            ></input>

            <p>Год постройки</p>
            <input className='border' type='number' placeholder='2017'></input>

            <p>Этаж</p>
            <input className='border' type='number' placeholder='2'></input>

            <p>Этажей в здании</p>
            <input className='border' type='number' placeholder='2'></input>
          </div>
        </div>
        <div className='half-wrapper'>
          <div>
            <p>
              Площадь в м<sup>2</sup>
            </p>
            <input className='border' type='number' placeholder='50'></input>

            <p>Цена</p>
            <CurrencyFormat
              placeholder='15,500,000&#8376;'
              thousandSeparator={true}
            />

            <p>Описание</p>
            <textarea
              className='input-description border'
              type='text'
              placeholder='Кратко
            опишите детали Вашего объявления.'
              maxLength='1000'
            ></textarea>

            <div className='upload-images-container'>
              <div>
                <p>Загрузить фотографии</p>
                <span>
                  Размер фотографии: 800px x 800px. Максимальный вес 4мб.
                </span>
              </div>
              <div>
                <input
                  type='file'
                  multiple
                  //onChange={this.multipleFileChangedHandler}
                />
              </div>
            </div>

            <button className='btn btn-success'>Опубликовать</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPublication;
