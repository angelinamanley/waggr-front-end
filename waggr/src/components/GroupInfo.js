import React from "react";
import { Button, Container } from "semantic-ui-react";
import {Link} from 'react-router-dom'
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
      this.setState({ membership: false })
    );
  };

  render() {
    if (!this.props.group || !this.props.user || !this.props.group.users) { 
      
          return (
            <div>
              <h2>Loading</h2>
            </div>
          );
        } else {

 
      const membership = this.props.group.users.find(user => user.id === this.props.user.id)
      const admin = this.props.group.admin_id === this.props.user.id 
      return (
        <Container>
        <h2>{this.props.group.name} </h2>
          <p>{this.props.group.description} </p>
          <p>Are you a member?
              {membership?  "yes"
              : "no"}
          </p>
          { admin? <Button as={Link} to={`/groups/${this.props.group.id}/edit`} size='mini' color="yellow" label="Edit Group" /> : null}
          {!membership
           ? (
            <Button size='mini' secondary onClick={() => this.handleJoinClick()}> Join us! </Button>
          ) : (
            !admin? <Button size='mini' secondary onClick={() => this.handleLeaveClick()}>
              Leave Group
            </Button> : null
          )}
        </Container>
      )

  } }
}

export default GroupInfo;
