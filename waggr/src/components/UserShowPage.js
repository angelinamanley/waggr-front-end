import React from 'react';
import {Card, Image, Segment, Container} from 'semantic-ui-react'
import DogsContainer from './DogsContainer'
import UserMeetups from './UserMeetups'

const UserShowPage = props => {


    if (!props.selectedUser) {
       return <h3>Loading</h3>
    } else {

    return(

       <div>
        <Image src={props.selectedUser.photo} circular />
  
        <DogsContainer selectDog={props.selectDog} dogs={props.selectedUser.dogs} />
        <h3>{props.selectedUser.first_name}'s Meetups</h3>
        <UserMeetups user={props.selectedUser} userSelectMeetup={props.userSelectMeetup}/>

        </div>
    
        
    )

    }
}

export default UserShowPage