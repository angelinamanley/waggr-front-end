import React from 'react';
import { Image } from 'semantic-ui-react'
import DogsContainer from './DogsContainer'
import UserMeetups from './UserMeetups'
import API from '../adapters/API'


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
        <Image size="small" src={this.state.user.photo} circular />
        <h2>{this.state.user.first_name}</h2>
        <h4>{this.state.user.aboutme}</h4>
        <h3>{this.state.user.first_name}'s dogs</h3> 
        <DogsContainer  dogs={this.state.user.dogs} />
        <h3>{this.state.user.first_name}'s Meetups</h3>
        <UserMeetups user={this.state.user} />

        </div>
    
        
    )

    } }
}

export default UserShowPage