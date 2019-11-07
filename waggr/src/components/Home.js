import React from "react";
import UserGroups from './UserGroups'
import UserMeetups from './UserMeetups'


//search component for groups goes here as well as an explore component

const Home = props => {
  return (
    <div>
      <h2>Your Groups</h2>
      <UserGroups userSelectGroup={props.userSelectGroup} user={props.user}/>
      <h2> Your Meetups </h2>
      <UserMeetups user={props.user} />

    </div>
  );
};

export default Home;
