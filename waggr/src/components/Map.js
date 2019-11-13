import React from "react";
import MapSearchBar from "./MapSearchBar";
import MapComponent from "./MapComponent";
import API from "../adapters/API";
import LocationSearchInput from './LocationSearchInput'
import TopBar from './TopBar'


class Map extends React.Component {

  state = {
    meetups: null,
    location: "",
    longitude: -0.12444, 
    latitude: 51.5116571
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
         <TopBar text={"Map it"} />
         <div><h3>Search for meetups by location </h3></div>
        
        <LocationSearchInput selectLocation={this.selectLocation}/>
        <MapComponent allProps={this.props} meetups={this.state.meetups} latitude={this.state.latitude} longitude={this.state.longitude} user={this.props.user}/>
      </div>
    );
  }
}

export default Map;
