import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
    width: '100%',
    height: '100%',
  };

class MapContainer extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          stores: [
                  {latitude: 51.462829, longitude: -0.114},
                  {latitude: 51.460337, longitude: -98},
                  {latitude: 51.4510, longitude: -0.115},
                  {latitude: 51.390, longitude: -0.1145}
                  ]
        }
      }
    
      displayMarkers = () => {
        return this.state.stores.map((store, index) => {
          return <Marker key={index} id={index} position={{
           lat: store.latitude,
           lng: store.longitude
         }}
         onClick={() => console.log("You clicked me!")} />
        })
      }
    
      render() {
        return (
            <Map
              google={this.props.google}
              zoom={15}
              style={mapStyles}
              initialCenter={{ lat: 51.4615783, lng: -0.1205838}}
            >
              {this.displayMarkers()}
            </Map>
        );
      }
    }

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCFnoBGTrlB9212W-BX4rHGnWvHEij9bnA'
  })(MapContainer); 