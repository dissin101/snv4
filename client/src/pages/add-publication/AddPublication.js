import React, { useState } from "react";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import { ToastContainer, toast } from "react-toastify";
import "./addPublication.scss";

const AddPublication = () => {
  const usrData = JSON.parse(localStorage.getItem("userData"));
  const [form, setForm] = useState({
    city: "",
    address: "",
    dateOfBuild: "",
    floor: "",
    floorsInBuilding: "",
    area: "",
    price: "",
    description: "",
    type: "",
    rooms: "",
    category: "",
    images: [{}],
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const [selectedFiles, useSelectedFiles] = useState({
    selectedFiles: null,
    useSelectedFiles: null,
  });

  const MultipleFileChangedHandler = (event) => {
    useSelectedFiles(event.target.files);
  };

  const handleClick = async () => {
    form.type = rentType;
    form.category = category;
    form.rooms = roomsCount;
    form.rooms = Number(form.rooms);
    form.dateOfBuild = Number(form.dateOfBuild);
    form.floor = Number(form.floor);
    form.floorsInBuilding = Number(form.floorsInBuilding);
    form.area = Number(form.area);
    for (let a = 0; a <= form.price.length; a++) {
      if (form.price[a] === ",") {
        form.price = form.price.replace(/,/, "");
      }
    }
    form.price = Number(form.price);
    const data = new FormData();
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append("galleryImage", selectedFiles[i], selectedFiles[i].name);
      }
      for (let prop in form) {
        data.append(prop, form[prop]);
      }

      axios
        .post("/api/add-publication", data, {
          headers: {
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": "multipart/form-data",
            "x-auth-token": usrData.token,
          },
        })
        .then((response) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                toast.info(
                  "Максимальный размер файла для загрузки не должен привышать 4мб."
                );
              } else if ("LIMIT_UNEXPECTED_FILE" === response.data.error.code) {
                toast.info(
                  "Максимальное количество доступных фотографий для загрузки: 10"
                );
              } else {
                toast.error("Вы пытаетесь загрузить файл неверного формата");
              }
            } else {
              let fileName = response.data;
              toast.success("Объявление опубликовано");
            }
          }
        })
        .catch((error) => {
          toast.error("Произошла ошибка:", error);
        });
    } else {
      toast.error("Пожалуйста, выберите фотографии для загрузки");
    }
  };

  const [category, setCategory] = useState("");
  const categoryHandle = (event) => {
    setCategory(event.target.value);
  };

  const [rentType, setRentType] = useState("");
  const rentHandle = (event) => {
    setRentType(event.target.value);
  };

  const [roomsCount, setRooms] = useState("");
  const roomsHandle = (event) => {
    setRooms(event.target.value);
  };

  return (
    <div className='border add-publication'>
      <h4 className='border-bottom pb-4 mt-1 mb-4'>Опубликовать объявление</h4>

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
      />

      <div className='add-pubcliation-params-container'>
        <div className='half-wrapper'>
          <div>
            <p>Рубрика</p>
            <select
              className='border'
              onChange={categoryHandle}
              value={category}
            >
              <option hidden value=' '>
                {" "}
              </option>
              <option value='Продажа'>Продажа</option>
              <option value='Аренда'>Аренда</option>
            </select>

            <p>Тип недвижимости</p>
            <select className='border' onChange={rentHandle} value={rentType}>
              <option hidden value=' '>
                {" "}
              </option>
              <option value='Квартира'>Квартира</option>
              <option value='Дом'>Дом</option>
              <option value='Коммерческая'>Коммерческая</option>
            </select>

            <p>Количество комнат</p>
            <select onChange={roomsHandle} value={roomsCount}>
              <option hidden value=' '>
                {" "}
              </option>
              <option value='1'>1-комнатная</option>
              <option value='2'>2-комнатная</option>
              <option value='3'>3-комнатная</option>
              <option value='4'>4-комнатная</option>
              <option value='5'>5 и более</option>
            </select>

            <p>Город</p>
            <input
              className='border'
              type='text'
              placeholder='Алматы'
              id='city'
              name='city'
              value={form.city}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <p>Адрес</p>
            <input
              className='border'
              type='text'
              placeholder='пр. Абая'
              id='address'
              name='address'
              value={form.address}
              onChange={changeHandler}
            ></input>

            <p>Год постройки</p>
            <input
              className='border'
              type='number'
              placeholder='2017'
              id='dateOfBuild'
              name='dateOfBuild'
              value={form.dateOfBuild}
              onChange={changeHandler}
            ></input>

            <p>Этаж</p>
            <input
              className='border'
              type='number'
              placeholder='2'
              id='floor'
              name='floor'
              value={form.floor}
              onChange={changeHandler}
            ></input>

            <p>Этажей в здании</p>
            <input
              className='border'
              type='number'
              placeholder='2'
              id='floorsInBuilding'
              name='floorsInBuilding'
              value={form.floorsInBuilding}
              onChange={changeHandler}
            ></input>
          </div>
        </div>
        <div className='half-wrapper'>
          <div>
            <p>
              Площадь в м<sup>2</sup>
            </p>
            <input
              className='border'
              type='number'
              placeholder='50'
              id='area'
              name='area'
              value={form.area}
              onChange={changeHandler}
            ></input>

            <p>Цена</p>
            <CurrencyFormat
              placeholder='15,500,000&#8376;'
              thousandSeparator={true}
              id='price'
              name='price'
              value={form.price}
              onChange={changeHandler}
            />

            <p>Описание</p>
            <textarea
              className='input-description border'
              type='text'
              placeholder='Кратко
            опишите детали Вашего объявления.'
              maxLength='1000'
              id='description'
              name='description'
              value={form.description}
              onChange={changeHandler}
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
                  onChange={MultipleFileChangedHandler}
                />
              </div>
            </div>

            <button className='btn btn-success' onClick={handleClick}>
              Опубликовать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPublication;
