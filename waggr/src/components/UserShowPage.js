import React from 'react';
import { Image } from 'semantic-ui-react'
import DogsContainer from './DogsContainer'
import UserMeetups from './UserMeetups'
import API from '../adapters/API'
import TopBar from './TopBar.js'

class UserShowPage extends React.Component {

    state = { 
        user: null
      }
    
    componentDidMount(){ 
        API.getUser(this.props.match.params.id).then(user => this.setState({user}))
      }

      render() {
    if (!this.state.user) {
       return <h3>Loading</h3>
    } else {
    return(

      <div>
      <TopBar text={this.state.user.first_name} />
    <div id="usershowpage" style={{ marginRight: '2em', marginLeft: '2em'}}>
        <Image centered size="small" src={this.state.user.photo} circular />
        <div style={{ textAlign: 'center', fontSize: '120%', marginTop: '2%'}}>
          <b>{this.state.user.aboutme}</b>
        </div>
        <h3>{this.state.user.first_name}'s dogs</h3> 
        <DogsContainer  dogs={this.state.user.dogs} />
        <h3>{this.state.user.first_name}'s Meetups</h3>
        <UserMeetups user={this.state.user} />

        </div>
        </div>
        
    )

    } }
}

export default UserShowPage