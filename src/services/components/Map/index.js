/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment, useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "../../../../src/topBarStyle.css"
import api from "../../api"

import 'mapbox-gl/dist/mapbox-gl.css';

export class Map extends Component {
  constructor(props){
    super(props)
this.state = {
      coordinates: {points:[]},
      latitude: -22.2532,
      longitude: -45.2710,
      raio:100,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -22.2532,
      longitude: -45.2710,
      zoom: 8,
    },
  };
  this.fireFire =this.findFire.bind(this)
  this.setState = this.setState.bind(this)
  }
  
  componentWillMount(){
    console.log("oi");
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();

  }

   findFire=async()=>{
    const fire = await api.get("/teste");
    console.log(fire.data[0].latitude)
  
    const fireArray= []
    let fator=0
    
    
    fire.data.slice(10).forEach(element => {
      
      let raio_ang = this.state.raio/111.195
      if(element.latitude-this.state.viewport.latitude < raio_ang && element.longitude - this.state.viewport.latitude < raio_ang){
          let distance=Math.pow(Number.parseFloat(element.latitude)-this.state.viewport.latitude,2)
          distance+=Math.pow(Number.parseFloat(element.longitude)-this.state.viewport.longitude,2)
          distance = Math.pow(distance, (1/2))
          if(distance < raio_ang){
            if(element.confidence==="nominal"){
              fator=0.6
            }
            else if(element.confidence==="low"){
              fator=0.3
            }
            else{
              fator=1
            }

            fireArray.push({
                latitude: Number.parseFloat(element.latitude),
                longitude:Number.parseFloat( element.longitude),
                confidence: fator
      
              })
            
            }
        }
    });
    this.setState({
        ...this.state,
        coordinates:{
          points:fireArray
        }
      })
    
    console.log(this.state.coordinates.points)

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
    })
  }
  setRaio = (e) => {
    this.setState({
        ...this.state,
        [e.target.id]: e.target.value,
        raio: e.target.value  
    })
  }


  render() {
    return (
        <Fragment>
            <div class="top-bar">
                <form id="formulario">
                  <span>Latitude: </span>
                  <input class="inputs" id="latitude" value={this.state.latitude} onChange={this.setLatitude}/> 
                  <span> Longitude: </span>
                  <input class="inputs" id="longitude" value={this.state.longitude} onChange={this.setLongitude}/>
                  <span> Raio: </span>
                  <input class="inputs" id="raio" value={this.state.raio} onChange={this.setRaio}/>     
                </form>
            <button onClick={this.findFire}>Achar focos</button>

            </div>
            
            
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

        {this.state.coordinates.points.map(point => {
            console.log(point)
          return (
            <Marker
              latitude={point.latitude}
              longitude={point.longitude}
              offsetLeft={-15}
              offsetTop={-10}
            >
              <img
            alt="avatar"
            style={{
              borderRadius: 100,
              width: 48,
              height: 48,
            }}
            src="https://cdn1.iconfinder.com/data/icons/natural-world/360/fire-flame_20-512.png"
          />
            </Marker>
          );
        })}
      </MapGL>
      </Fragment>
    );
  }
}
export default Map;