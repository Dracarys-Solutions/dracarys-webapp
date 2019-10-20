/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment, useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import 'mapbox-gl/dist/mapbox-gl.css';

export class Map extends Component {
  
  state = {
      latitude: -22.2532,
      longitude: -45.2710,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -22.2532,
      longitude: -45.2710,
      zoom: 14,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = async (e) => {
    const [longitude, latitude] = e.lngLat;
  }; 

  setLatitude = (e) => {
    this.setState({
        ...this.state,
        [e.target.id]: e.target.value,
        viewport: {
        ...this.state.viewport,
        latitude: Number.parseFloat(e.target.value),
        }
        // [this.state.viewport.latitude]: e.target.value
    })
  }

  setLongitude = (e) => {
    this.setState({
        ...this.state,
        [e.target.id]: e.target.value,
        viewport: {
            ...this.state.viewport,
            longitude: Number.parseFloat(e.target.value),
            }
        // [this.state.viewport.longitude]: e.target.value    
    })
  }


  render() {
    return (
        <Fragment>
            <form onSubmit={() => {}}>
                <br />
              <span>Latitude: </span>
              <input id="latitude" value={this.state.latitude} onChange={this.setLatitude}/> 
              <span> Longitude: </span>
              <input id="longitude" value={this.state.longitude} onChange={this.setLongitude}/>
              <br /><br />
            </form>

            
      <MapGL
        {...this.state.viewport}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYnJ1bmFwaWNvbGkiLCJhIjoiY2sxeWpseGE1MDRmaTNjcGMxejc2anFqYyJ9.tOAJEAk40YOhCCK2mMfI3w"
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <Marker
          latitude={Number.parseFloat(this.state.latitude)}
          longitude={Number.parseFloat(this.state.longitude)}
          onClick={this.handleMapClick}
          captureClick
        >
          <img
            alt="avatar"
            style={{
              borderRadius: 100,
              width: 48,
              height: 48,
            }}
            src="https://i7.pngguru.com/preview/200/363/803/computer-icons-check-in-icon.jpg"
          />
        </Marker>
      </MapGL>
      </Fragment>
    );
  }
}
export default Map;