import React from "react";
import UserGroups from './UserGroups'
import UserMeetups from './UserMeetups'
import { Container, Grid, Image, Header , Divider } from "semantic-ui-react";
import Logo from './common/icon.png'
import TopBar from './TopBar'


//search component for groups goes here as well as an explore component

const Home = props => {
  return (
    <div>
     
     <TopBar text={"waggr"} />
     
   
    <div id="header"style={{ marginRight: '2em', marginLeft: '2em', marginBottom: '5%'}} > 
    <h3>Your Groups</h3>
   
   
      <UserGroups userSelectGroup={props.userSelectGroup} user={props.user}/> 
    <h3> Your Meetups </h3>
     
      
      <UserMeetups user={props.user} />
      </div>  
      </div>
    
  )
};

export default Home;
