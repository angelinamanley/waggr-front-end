import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

const NavBar = props => {
    return (
            <Menu borderless fluid widths={5}>
            <Menu.Item as={NavLink} exact to="/home" >Home</Menu.Item>
            <Menu.Item as={NavLink} exact to="/groups" >Groups</Menu.Item>
            <Menu.Item as={NavLink} exact to="/map" >Map</Menu.Item>
            <Menu.Item as={NavLink} exact to="/dashboard" >Dashboard</Menu.Item>
            <Menu.Item as={NavLink} exact to="/login" onClick={()=> props.logout()}> Log Out </Menu.Item>
            </Menu>
    )
  }

export default NavBar;