import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const mapData = {
  center: [55.751574, 37.573856],
  zoom: 5,
};
const coordinates = [
  [55.684758, 37.738521],
  [57.684758, 39.738521],
];

const YaMap = () => {
  return (
    <div>
      <YMaps>
        <Map defaultState={mapData}>
          {coordinates.map((coordinate) => (
            <Placemark geometry={coordinate} />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default YaMap;
