import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Spinner from './common/Spinner';
import Logo from './common/waggrlogo4.png'
import PinkLogo from './common/pinklogo.png'
import moment from 'moment'



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
          icon={{ url: PinkLogo, scaledSize: new this.props.google.maps.Size(35,45)}}
          key={index}
          id={meetup.id}
          name={meetup.name}
          datetime={meetup.datetime}
          position={{
            lat: meetup.latitude,
            lng: meetup.longitude
          }}
          onClick={this.handleMarkerClick}
          // onClick={console.log}
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
        zoom={11}
        style={mapStyles}
        initialCenter={{ lat: this.props.latitude, lng: this.props.longitude}}
        center={{ lat: this.props.latitude, lng: this.props.longitude}}
      >
        <Marker icon={{url: Logo, scaledSize: new this.props.google.maps.Size(35,45)}} position={ {lat: this.props.latitude, lng: this.props.longitude }} />
        {this.displayMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.handleClose}
        >
          <a onClick={this.handleInfoLinkClick} href={`/meetups/${this.state.activeMarker.id}`}>
          <div><h4>{this.state.selectedPlace.name}</h4>
          {moment(this.state.selectedPlace.datetime).format('LLL')}
        
          </div>

          </a>
        </InfoWindow>
      </Map>
    );
  } }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);
