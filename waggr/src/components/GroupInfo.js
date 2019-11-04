import React from "react";
import { Button, Container } from "semantic-ui-react";
import API from "../adapters/API";

class GroupInfo extends React.Component {
  state = {
    membership: null
  };


  handleJoinClick = () => {
    API.joinGroup({
      group_id: this.props.group.id,
      user_id: this.props.user.id
    }).then(this.setState({ membership: true }));
  };

  findMembershipId = () =>
    this.props.user.memberships.find(
      membership => membership.group_id === this.props.group.id
    ).id;

  handleLeaveClick = () => {
    API.leaveGroup(this.findMembershipId()).then(
      this.setState({ member: false })
    );
  };

  render() {

   
    if (!this.props.group) { 
      
      return (
        <div>
          <h2>Loading</h2>
        </div>
      );
    } else {
      const membership = this.props.group.users.find(user => user.id == this.props.user.id)
      return (
        <Container>
        <h2>{this.props.group.name} </h2>
          <p>{this.props.group.description} </p>
          <p>Are you a member?
              {membership?  "yes"
              : "no"}
          </p>
          {!this.props.group.users.find(
            user => user.id == this.props.user.id
          ) ? (
            <Button secondary onClick={() => this.handleJoinClick()}> Join us! </Button>
          ) : (
            <Button secondary onClick={() => this.handleLeaveClick()}>
              Leave Group
            </Button>
          )}
        </Container>
      );
    }
  }
}

export default GroupInfo;
