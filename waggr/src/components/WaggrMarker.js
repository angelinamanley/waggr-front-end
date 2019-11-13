import React from "react"
import { Marker } from "react-google-maps"
import Logo from './common/icon.png'



export default class WaggrMarker extends React.Component {

  render(){
    return(
        <Marker
          position={this.props.position}
        //   icon={Logo}
        >
        </Marker>
    );
  }
}