import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Home = () => {
  return (
      <MapContainer center={[27.7172, 85.324]} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[27.7172, 85.324]}>
          <Popup>Kathmandu</Popup>
        </Marker>
      </MapContainer>
  );
};

export default Home;
