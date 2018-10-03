import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from "./components/map"
import Layout from './components/layout';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout />
        <Map
          id="map"
          options={{
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8
          }}
          onMapLoad={map => {
            var marker = new window.google.maps.Marker({
              position: { lat: 41.0082, lng: 28.9784 },
              map: map,
              title: 'Hello Istanbul!'
            });
          }}
        />
      </React.Fragment>
    );
  }
}

export default App;
