import React, {useState, useRef} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapContainer.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapContainer = ({latitude, longitude, setLatitude, setLongitude}) => {

    const map = useRef(null);

    L.Icon.Default.ImagePath='../../public/marker/';

    const changeCoordinates = (event) => {
        setLatitude(event.latlng.lat.toFixed(3));
        setLongitude(event.latlng.lng.toFixed(3));
    };

    return <Map ref={map} center={[latitude, longitude]} onClick={changeCoordinates} zoom={7}>
        <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}/>
    </Map>

};

export default MapContainer;