import React from "react";
import MapSearchBar from "./MapSearchBar";
import MapComponent from "./MapComponent";
import API from "../adapters/API";

class Map extends React.Component {

  state = {
    meetups: null
  }

  componentDidMount(){

    API.getMeetups().then(meetups => this.setState({meetups}))
  }


  setLocation = input => {
    this.setState(
      { userLocation: input })
      API.addLocationToUser( { location: input, user_id: this.props.user.id})
    .then(user => this.props.setUserLocation(user.location, user.latitude, user.longitude))
  };

  render() {
    return (
      <div>
        <h2> this is the map page </h2>
        <MapSearchBar setLocation={this.setLocation} />
        <MapComponent meetups={this.state.meetups} user={this.props.user}/>
      </div>
    );
  }
}

export default Map;
