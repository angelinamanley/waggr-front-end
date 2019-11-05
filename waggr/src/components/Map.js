import React from "react";
import MapSearchBar from "./MapSearchBar";
import MapComponent from "./MapComponent";
import API from "../adapters/API";

class Map extends React.Component {
  state = {
    userLocation: null
  };

  setLocation = input => {
    this.setState(
      { userLocation: input })
      API.addLocationToUser( { location: input, user_id: this.props.user.id})
    .then(console.log)
  };

  render() {
    return (
      <div>
        <h2> this is the map page </h2>
        <MapSearchBar setLocation={this.setLocation} />
        <MapComponent meetups={this.props.meetups} user={this.props.user}/>
      </div>
    );
  }
}

export default Map;
