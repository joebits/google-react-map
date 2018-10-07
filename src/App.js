import React, { Component } from 'react';
import { render } from "react-dom";
import './App.css';
import Map from "./components/map";
import Layout from './components/layout';
import { InfoWindow } from './components/infoWindow';
import { sthlmOptions } from "./sthlmOptions";
import { connect } from 'react-redux'
import { addLocation } from './store/actions'

const containerStyle = {
  height: '100%',
  width: '100%',
  margin: 0,
  padding: 0
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      infoWindow: null,
      location: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const value = event.target.elements[0].value;
    this.props.dispatch(addLocation({
      name: value,
      lat: this.state.lat,
      lng: this.state.lng
    }));
    this.state.infoWindow.close();
  }

  openWindow(e, map) {
    //Remove old window before opening a new.
    //TODO: Remove infoElement?
    if (this.state.infoWindow) {
      this.state.infoWindow.close();
    }
    //Set info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoContainer" />',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    });

    //Append custom window to the infoContainer when dom is ready
    infoWindow.addListener('domready', e => {
      document.getElementById('infoContainer').addEventListener('submit', (e) => {
        e.preventDefault();
      })
      render(
        <InfoWindow handleSubmit={this.handleSubmit} />,
        document.getElementById('infoContainer'))
    })

    //save window and coordinates for later
    this.setState({
      infoWindow: infoWindow,
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });

    infoWindow.open(map)

  }

  render() {
    return (
      <div style={containerStyle}>
        <Layout />
        <Map
          id="map"
          options={sthlmOptions}
          onMapLoad={map => {
            map.addListener('click', (event) => {
              this.openWindow(event, map);
            });
          }}
        />
      </div>
    );
  }
}



export default connect()(App)
