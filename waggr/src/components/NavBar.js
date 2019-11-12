import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Responsive, Icon } from 'semantic-ui-react'

const NavBar = props => {
    return (
            <Responsive as={Menu} icon='labeled' color='teal'  widths={4}  inverted borderless fixed='bottom'>
            <Menu.Item as={NavLink} exact to="/home" ><Icon name='home'/>Home</Menu.Item>
            <Menu.Item as={NavLink} exact to="/groups" ><Icon name='paw'/>Groups</Menu.Item>
            <Menu.Item as={NavLink} exact to="/map" ><Icon name='map outline'/>Map</Menu.Item>
            <Menu.Item as={NavLink} exact to="/dashboard" ><Icon name='setting'/>Dashboard</Menu.Item>
            {/* <Menu.Item as={NavLink} exact to="/login" onClick={()=> props.logout()}> Log Out </Menu.Item> */}
            </Responsive>
    )
  }

export default NavBar;