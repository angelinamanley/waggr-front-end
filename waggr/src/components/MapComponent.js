import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import API from "../adapters/API";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class MapContainer extends React.Component {
  state = {
    meetups: null
  };

  componentDidMount() {
    API.getMeetups().then(meetups => this.setState({ meetups }));
  }

  displayMarkers = () => {
    return this.state.meetups.map((meetup, index) => {
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
    if (!this.state.meetups) {
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
  apiKey: "AIzaSyCFnoBGTrlB9212W-BX4rHGnWvHEij9bnA"
})(MapContainer);
