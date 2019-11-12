import React from "react";
import GroupInfo from "./GroupInfo";
import GroupForum from "./GroupForum";
import GroupShowMenu from "./GroupShowMenu";
import GroupMeetups from "./GroupMeetups";
import GroupAbout from "./GroupAbout";
import API from "../adapters/API";


class GroupShowPage extends React.Component {
  state = {
    menuSelect: "chat",
    group: null 
  };

  componentDidMount(){
    API.getGroup(this.props.match.params.id).then(group => this.setState({group}))
  }
  
  handleMenuSelect = menuItem => {
    this.setState({ menuSelect: menuItem });
  };

  handleJoinClick = group => {
    this.props.addGrouptoUser(group)
    let newGroupUsers = [...this.state.group.users, this.props.user]
    this.setState({group: {...this.state.group, users: newGroupUsers }})
  }

  handleLeaveClick = () => {
    let newGroupUsers = this.state.group.users.filter(user => user.id !== this.props.user.id)
    this.setState({ group: {...this.state.group, users: newGroupUsers}})
  }

  addPostToGroup = (post) => {
    // let newPosts = []
    // newPosts = [...this.state.group.posts, post]
   this.setState({group: {...this.state.group, posts: [post, ...this.state.group.posts ]}})
 }

  removePost = (id ) => {
  
    let newPosts = this.state.group.posts.filter(post => post.id !== id )
    this.setState({group: {...this.state.group, posts: newPosts}})
  }


  render() {
    let component;
    const menuChoice = this.state.menuSelect;
    if (menuChoice === "about") {
      component = <GroupAbout group={this.state.group} />;
    } else if (menuChoice === "meetups") {
      component = <GroupMeetups  group={this.state.group} />;
    } else if (menuChoice === "chat") {
      component = (
        <GroupForum removePost={this.removePost} addPostToGroup={this.addPostToGroup} user={this.props.user} group={this.state.group} />
      );
    }

    return (
      <div>
        <GroupInfo handleLeaveClick={this.handleLeaveClick} handleJoinClick={this.handleJoinClick} user={this.props.user} group={this.state.group} />
        <GroupShowMenu handleMenuSelect={this.handleMenuSelect} />
        {component}
      </div>
    );
  }
}

export default GroupShowPage;
