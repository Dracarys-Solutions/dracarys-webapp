import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
function App() {
  return (
    <div className="App">
      <form>
        <h3>Latitude: </h3>
        <input />
        <br />
        <h3>Longitude: </h3>
        <input />
        <br /> <br />
        <button type="submit">OK</button>
      </form>
    </div>
  );
}

export default App;
