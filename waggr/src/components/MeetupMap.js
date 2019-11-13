// import React from 'react';
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
// import apiKey from "../config/config_keys"
// import {Container} from 'semantic-ui-react'
// import Logo from './common/waggrlogo4.png'


// const mapStyles = {
//     // width: "80%",
//     height: "20%", 
//     width: '20%',
//     position: "relative"
//   };

// class MeetupMap extends React.Component {

//     constructor() {
//         super();
//         this.state = {
//           showingInfoWindow: false,
//           activeMarker: {},
//           selectedPlace: {}
        
//         }
//       }

//     render(){

//         return(
            
//             // <div className="map" style={{ height: '100%', width: '100%' }}>
//             <Map
//         google={this.props.google}
//         zoom={12}
//         containerElement={ <div style={{ height: `80%`, width: '50%' }} /> }
//         mapElement={ <div style={{ height: `100` }} /> }
//         initialCenter={{ lat: this.props.meetup.latitude, lng: this.props.meetup.longitude}}
//       >

//       <Marker icon={{url: Logo, scaledSize:  new this.props.google.maps.Size(28,38)}} position={ {lat:  this.props.meetup.latitude, lng:  this.props.meetup.longitude }} />
//       </Map>
//     //   </div>
//         )


//     }


// }


// export default GoogleApiWrapper({
//     apiKey: apiKey
//   })(MeetupMap);
  