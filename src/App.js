import React, {useState} from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import {Component} from 'react';
import ReactMapGL from 'react-map-gl';

function App() {
  const [latitude, setLatitude] = useState("22.25")
  const [longitude, setLongitude] = useState("45.27")
  console.log(latitude);

  function handleSubmit(){
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>Latitude: </h3>
        <input value={latitude} onChange={event => setLatitude(event.target.value)}/>
        <br />
        <h3>Longitude: </h3>
        <input value={longitude} onChange={event => setLongitude(event.target.value)}/>
        <br /> <br />
        <button type="submit">OK</button>
      </form>
    </div>
  );
}

export default App;
