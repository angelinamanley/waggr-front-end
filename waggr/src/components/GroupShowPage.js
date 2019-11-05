import React from "react";
import GroupInfo from "./GroupInfo";
import GroupForum from "./GroupForum";
import GroupShowMenu from "./GroupShowMenu";
import GroupMeetups from "./GroupMeetups";
import GroupAbout from "./GroupAbout";

class GroupShowPage extends React.Component {
  state = {
    menuSelect: "home"
  };

  handleMenuSelect = menuItem => {
    this.setState({ menuSelect: menuItem });
  };

  render() {
    let component;
    const menuChoice = this.state.menuSelect;
    if (menuChoice === "about") {
      component = <GroupAbout group={this.props.group} />;
    } else if (menuChoice === "meetups") {
      component = <GroupMeetups userSelectMeetup={this.props.userSelectMeetup} group={this.props.group} />;
    } else if (menuChoice === "chat") {
      component = (
        <GroupForum addPostToGroup={this.props.addPostToGroup} user={this.props.user} group={this.props.group} />
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
