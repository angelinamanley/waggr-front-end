import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import API from "../adapters/API";
import apiKey from "../config/config_keys"

const mapStyles = {
  width: "100%",
  height: "100%"
};

class MapContainer extends React.Component {



  displayMarkers = () => {
    return this.props.meetups.map((meetup, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: meetup.latitude,
            lng: meetup.longitude
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    if (!this.props.meetups) {
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
      </Map>
    );
  } }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);
