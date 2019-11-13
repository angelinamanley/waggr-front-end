import React from "react";
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import apiKey from "../config/config_keys"
import Spinner from './common/Spinner';


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

  handleInfoLinkClick = e => {
    this.props.history.push(e.target.href)
  }

  render() {
    if (!this.props.meetups) {
      return <Spinner />}
      else {
  
    // if (!this.props.meetups || !this.props.longitude || !this.props.latitude ) {
    //   return <div>Enter a location to start searching for meetups!</div>
    // } else{

      // const userCoords = {lat: this.props.user.latitude, lng: this.props.user.longitude}
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{ lat: 51.5132612, lng: -0.12290489999998044}}
      >
        <Marker position={ {lat: this.props.latitude, lng: this.props.longitude }} />
        {this.displayMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.handleClose}
        >
          <a onClick={this.handleInfoLinkClick} href={`/meetups/`}>
          <div>{this.state.selectedPlace.name}</div>
          </a>
        </InfoWindow>
      </Map>
    );
  } }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);
