import React from "react";
import { NavLink } from "react-router-dom";
import {Card,  Image, Message, Container } from 'semantic-ui-react'


export default class UserMeetups extends React.Component {
  render() {
    if (!this.props.user) {
      return <div>Loading..</div>;
    } else if (this.props.user.groups.length === 0)
    { return( <Message color="violet" style={{width: '88%', marginRight: "auto", marginLeft: "auto", fontSize: '120%'}}>You haven't joined any meetups yet.</Message>) }
    else {
      return (
        <Container>
            <Card.Group centered>
          {this.props.user.meetups.map(meetup => (
            <Card color='violet' 
              fluid
              key={meetup.id}
              as={NavLink}
              to={`/meetups/${meetup.id}`}
              
            >
              <Card.Content>
                <Image floated="right" size="mini" src={meetup.photo} />
                <Card.Header size='medium'>{meetup.name}</Card.Header>
              </Card.Content>
            </Card>
          ))}</Card.Group>
        </Container>
      );
    }
  }
}
