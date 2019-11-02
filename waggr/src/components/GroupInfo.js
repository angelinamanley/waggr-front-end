import React from "react";
import { Button } from "semantic-ui-react";
import API from "../adapters/API";

class GroupInfo extends React.Component {
  state = {
    membership: null
  };

  // componentDidMount(){
  //     if (this.props && this.props.group.users.find(user => user.id == this.props.user.id)) {
  //         this.setState({membership: true})
  //     }

  // }

  handleJoinClick = () => {
    API.joinGroup({
      group_id: this.props.group.id,
      user_id: this.props.user.id
    }).then(this.setState({ membership: true }));
  };

  findMembershipId = () =>
    this.props.user.memberships.find(
      membership => membership.group_id == this.props.group.id
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
      return (
        <div>
          <h2>{this.props.group.name} </h2>
          <h3>{this.props.group.description} </h3>
          <h2>
            {this.props.group.users.find(user => user.id == this.props.user.id)
              ? "true"
              : "false"}
          </h2>
          {!this.props.group.users.find(
            user => user.id == this.props.user.id
          ) ? (
            <Button onClick={() => this.handleJoinClick()}> Join us! </Button>
          ) : (
            <Button onClick={() => this.handleLeaveClick()}>
              Leave Group
            </Button>
          )}
        </div>
      );
    }
  }
}

export default GroupInfo;
