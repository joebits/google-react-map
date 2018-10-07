import React, { Component } from 'react';
import { API_KEY } from "../API_KEY";


const mapStyle = {
  display: 'block',
  position: 'absolute',
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  marginTop: '48px',
  height: 'auto',
  width: '100%'
}
class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    // If google maps hasn't been loaded we create the script element
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${API_KEY}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={mapStyle} id={this.props.id} />
    );
  }
}

export default Map