import React from "react";
import MapSearchBar from "./MapSearchBar";
import MapComponent from "./MapComponent";
import API from "../adapters/API";
import LocationSearchInput from './LocationSearchInput'

class Map extends React.Component {

  state = {
    meetups: null,
    location: "", 
    longitude: ""
  }

  

  componentDidMount(){

    API.getMeetups().then(meetups => this.setState({meetups}))
  }

  selectLocation = (location, latitude, longitude) => {
    this.setState( {location, latitude, longitude})
  }

  // setLocation = input => {
  //   this.setState(
  //     { userLocation: input })
  //     API.addLocationToUser( { location: input, user_id: this.props.user.id})
  //   .then(user => this.props.setUserLocation(user.location, user.latitude, user.longitude))
  // };

  render() {
    return (
      <div>
        <h3>Search for meetups by location </h3>
        <LocationSearchInput selectLocation={this.selectLocation}/>
        <MapComponent meetups={this.state.meetups} latitude={this.state.latitude} longitude={this.state.longitude} user={this.props.user}/>
      </div>
    );
  }
}

export default Map;
