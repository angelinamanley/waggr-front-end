import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const AccountSettingsList = props => (
  <List selection verticalAlign='middle'>
    <List.Item as={ Link } to='/add_dog'>
        <Icon   color="violet" name="plus circle" />
      <List.Content>
        <List.Header>Add Dog</List.Header>
      </List.Content>
    </List.Item>
    <List.Item as={Link} to='/editaccount'>
        <List.Icon color="violet" name="edit" />
      <List.Content>
        <List.Header>Edit Account Details</List.Header>
      </List.Content>
    </List.Item>
    <List.Item as={Link} to='/changepassword'>
        <List.Icon color="violet"name="lock" />
      <List.Content>
        <List.Header>Change Password</List.Header>
      </List.Content>
    </List.Item>
    <List.Item onClick={props.showWidget}>
        <List.Icon color="violet" name="id badge" />
      <List.Content>
        <List.Header>Edit Profile Picture</List.Header>
      </List.Content>
    </List.Item>
    <List.Item onClick={()=> props.logout()} >
        <List.Icon color="violet" name="sign out alternate" />
      <List.Content>
        <List.Header>Log Out</List.Header>
      </List.Content>
    </List.Item>
  </List>
)

export default AccountSettingsList