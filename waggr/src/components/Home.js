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
    <Container fluid style={{paddingTop : '5px', paddingBottom: '1px'}} textAlign='center'>
    <div>  </div>
    <div style={{fontSize: '200%', fontWeight: 'bold', color: '#14B89C'}}> <Image style={{ maxWidth: '15%'}} verticalAlign='middle'  src={Logo} />waggr</div>
   
      </Container>
      <Divider  color="black" fluid="true" />
     
    </div>
    <div id="header" style={{marginLeft: '5%', marginBottom: '8px'}} > <h2>Your Groups</h2>
    </div>
   
      <UserGroups userSelectGroup={props.userSelectGroup} user={props.user}/>
      <div id="header" style={{marginLeft: '5%'}}><h2> Your Meetups </h2>
      </div>  
      
      <UserMeetups user={props.user} />

    
     </div>
  )
};

export default Home;
