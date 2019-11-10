import React from "react";
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import apiKey from "../config/config_keys"

const mapStyles = {
  width: "100%",
  height: "100%"
};

class MapContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    
    }
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleClose = this.handleClose.bind(this);


  }
  displayMarkers = () => {
    return this.props.meetups.map((meetup, index) => {
      return (
        <Marker
          key={index}
          id={index}
          name={meetup.name}
          position={{
            lat: meetup.latitude,
            lng: meetup.longitude
          }}
          onClick={this.handleMarkerClick}
        />
      );
    });
  };

  handleMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  };

  handleClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    if (!this.props.meetups || !this.props.user) {
      return <div>loading</div>
    } else{

      // const userCoords = {lat: this.props.user.latitude, lng: this.props.user.longitude}
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{ lat: this.props.user.latitude, lng: this.props.user.longitude }}
      >
        <Marker position={ {lat: this.props.user.latitude, lng: this.props.user.longitude }} />
        {this.displayMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.handleClose}
        >
          <div>{this.state.selectedPlace.name}<Button onClick={() => this.props.history.push('/dashboard')}></Button></div>
        </InfoWindow>
      </Map>
    );
  } }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);
