import React from 'react';
import {Card, Image, Segment, Container} from 'semantic-ui-react'
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
        const { user } = this.state
    return(

       <div>
        <Image src={this.state.user.photo} circular />
  
        <DogsContainer  dogs={this.state.user.dogs} />
        <h3>{this.state.user.first_name}'s Meetups</h3>
        <UserMeetups user={this.state.user} />

        </div>
    
        
    )

    } }
}

export default UserShowPage