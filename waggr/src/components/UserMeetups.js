import React from "react";
import { NavLink } from "react-router-dom";
import {Card,  Image } from 'semantic-ui-react'


export default class UserMeetups extends React.Component {
  render() {
    if (!this.props.user) {
      return <div>Loading..</div>;
    } else {
      return (
        <div>
        
          {this.props.user.meetups.map(meetup => (
            <Card
              key={meetup.id}
              as={NavLink}
              to="/meetup"
              onClick={() => this.props.userSelectMeetup(meetup.id)}
            >
              <Card.Content>
                <Image floated="right" seize="mini" src={meetup.photo} />
                <Card.Header>{meetup.name}</Card.Header>
              </Card.Content>
            </Card>
          ))}
        </div>
      );
    }
  }
}
