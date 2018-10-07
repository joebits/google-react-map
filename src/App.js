import React, { Component } from 'react';
import { render } from "react-dom";
import './App.css';
import Map from "./components/Map";
import Layout from './components/Layout';
import { InfoWindow } from './components/InfoWindow';
import { sthlmOptions } from "./sthlmOptions";
import { connect } from 'react-redux'
import { addLocation } from './store/actions'
import { LocationWindow } from './components/LocationWindow';

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

  componentWillReceiveProps({ showLocation }) {
    this.showLocationWindow(showLocation);
  }

  handleSubmit(event) {
    event.preventDefault();
    const value = event.target.elements[0].value;
    this.props.dispatch(addLocation({
      name: value,
      latLng: this.state.latLng
    }));
    this.state.infoWindow.close();
  }

  showLocationWindow(showLocation) {
    //set center from location
    window.gMap.setCenter(showLocation.latLng);
    const infoWindow = this.setInfoWindow(showLocation.latLng.lat(), showLocation.latLng.lng());
    infoWindow.addListener('domready', e => {
      render(
        <LocationWindow showLocation={showLocation} />,
        document.getElementById('infoContainer'))
    })

    //save window and coordinates for later
    this.setState({
      infoWindow: infoWindow
    });

    infoWindow.open(window.gMap)
  }

  openWindow(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const infoWindow = this.setInfoWindow(lat, lng)
    //Append custom window to the infoContainer when dom is ready
    infoWindow.addListener('domready', e => {
      render(
        <InfoWindow handleSubmit={this.handleSubmit} />,
        document.getElementById('infoContainer'))
    })

    //save window and coordinates for later
    this.setState({
      infoWindow: infoWindow,
      lat,
      lng,
      latLng: event.latLng
    });

    infoWindow.open(window.gMap)
  }

  setInfoWindow(lat, lng) {
    //Remove old window before opening a new.
    //TODO: Remove infoElement?
    if (this.state.infoWindow) {
      this.state.infoWindow.close();
      window.locationWindow = null;
    }
    //Set info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoContainer" />',
      position: { lat, lng }
    });

    window.locationWindow = infoWindow;
    return infoWindow;
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
              this.openWindow(event);
            });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ showLocation: state.showLocation });

export default connect(mapStateToProps)(App)
