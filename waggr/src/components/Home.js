import React from "react";
import UserGroups from './UserGroups'
import UserMeetups from './UserMeetups'
import { Container, Grid, Image, Header , Divider } from "semantic-ui-react";
import Logo from './common/icon.png'


//search component for groups goes here as well as an explore component

const Home = props => {
  return (
    <div>
     
    <Container  style={{paddingTop : '5px', paddingBottom: '0px'}} textAlign='center'>
 
    <div style={{fontSize: '200%', fontWeight: 'bold', color: '#14B89C', paddingTop : '2px', paddingBottom: '0px'}} textAlign='center'> <Image style={{ maxWidth: '15%'}} verticalAlign='middle'  src={Logo} />waggr</div>
   
      </Container> 
      <Divider  color="black" fluid="true" />
     
   
    <div id="header" style={{marginLeft: '5%', marginBottom: '5%'}} > <h2>Your Groups</h2>
    </div>
   
      <UserGroups userSelectGroup={props.userSelectGroup} user={props.user}/> 
      <div id="header" style={{marginLeft: '5%', marginBottom: '5%', marginTop: '5%'}}><h2> Your Meetups </h2>
      </div>  
      
      <UserMeetups user={props.user} />

    
     </div>
  )
};

export default Home;
