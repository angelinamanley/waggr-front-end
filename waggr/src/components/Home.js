import React from "react";
import UserGroups from './UserGroups'
import UserMeetups from './UserMeetups'
import { Container, Grid, Image, Header , Divider } from "semantic-ui-react";
import Logo from './common/icon.png'


//search component for groups goes here as well as an explore component

const Home = props => {
  return (
    <div>
      <div id="header-div">
    <Container fluid style={{paddingTop : '13px', paddingBottom: '5px'}} textAlign='center'>
     <h2 color="teal"> <Image size='mini' verticalAlign='middle' circular src={Logo} /> waggr </h2>
  
      </Container>
      <Divider  color="black" fluid="true" />
     
    </div>
    <h2>Your Groups</h2>
      <UserGroups userSelectGroup={props.userSelectGroup} user={props.user}/>
      <h2> Your Meetups </h2>
      <UserMeetups user={props.user} />

    
     </div>
  )
};

export default Home;
