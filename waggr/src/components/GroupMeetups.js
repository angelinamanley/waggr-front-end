import React from "react";
import { Button, List, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default class GroupMeetups extends React.Component {
   
    futureMeetups = () => {
        let  whatdayisit = new Date()

    return this.props.group.meetups.filter(meetup => Date(meetup.datetime) > whatdayisit )
    }


   render() {
       
    if(!this.props.group){
        return(<div> Loading </div> )

    } else {
  return (
   
      <div>
      <Button primary as={NavLink} to="/createmeetup">Add a new Meetup</Button>
      <List>
      {this.props.group.meetups.map(meetup => 
      <List.Item>
      <Image avatar src='./common/pawprint.png'/>
      <List.Content>
        <List.Header as='a'>{meetup.name}</List.Header>
        </List.Content>
        </List.Item>
      
      )}

      </List>
    
      </div>
    )

  }
  }
}
