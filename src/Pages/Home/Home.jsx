import React, {useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Avatar } from '@mui/material';

const socket = io.connect('http://localhost:7000');

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [myLatLong, setMyLatLong] = React.useState([27.7172, 85.324]);
  const username = useSelector((state) => state?.user?.user?.name) || "";
  const [latLong, setLatLong] = React.useState([]);
  const [me, setMe] = React.useState('');
  const [otherUsers, setOtherUsers] = React.useState('');
  // const map = useMap();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const sendLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit('location', {
        username: username,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setMyLatLong([position.coords.latitude, position.coords.longitude]);
    });
  };

  socket.on('location', (data) => {
    data.username === username
      ? setMyLatLong([data.latitude, data.longitude])
      : setLatLong([data.latitude, data.longitude]);
    data.username === username
      ? setMe(data.username)
      : setOtherUsers(data.username);
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const interval = setInterval(() => {
      sendLocation();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const myIcon = <Avatar alt={me} src="" />

  return (
    <MapContainer center={myLatLong} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={myLatLong}>
        <Popup>{me}</Popup>
      </Marker>
      {otherUsers === '' ? (
        <></>
      ) : (
        <Marker position={latLong}>
          <Popup>{otherUsers}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Home;
