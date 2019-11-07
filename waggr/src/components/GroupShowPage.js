import React from "react";
import GroupInfo from "./GroupInfo";
import GroupForum from "./GroupForum";
import GroupShowMenu from "./GroupShowMenu";
import GroupMeetups from "./GroupMeetups";
import GroupAbout from "./GroupAbout";
import API from "../adapters/API";


class GroupShowPage extends React.Component {
  state = {
    menuSelect: "home",
    group: null 
  };

  componentDidMount(){
    API.getGroup(this.props.match.params.id).then(group => this.setState({group}))
  }
  
  handleMenuSelect = menuItem => {
    this.setState({ menuSelect: menuItem });
  };

  render() {
    let component;
    const menuChoice = this.state.menuSelect;
    if (menuChoice === "about") {
      component = <GroupAbout group={this.state.group} />;
    } else if (menuChoice === "meetups") {
      component = <GroupMeetups userSelectMeetup={this.props.userSelectMeetup} group={this.state.group} />;
    } else if (menuChoice === "chat") {
      component = (
        <GroupForum removePost={this.props.removePost} addPostToGroup={this.props.addPostToGroup} user={this.props.user} group={this.state.group} />
      );
    }

    return (
      <div>
        <GroupInfo user={this.props.user} group={this.props.group} />
        <GroupShowMenu handleMenuSelect={this.handleMenuSelect} />
        {component}
      </div>
    );
  }
}

export default GroupShowPage;
