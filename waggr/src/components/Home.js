import React from "react";
import UserGroups from './UserGroups'
import UserMeetups from './UserMeetups'
import TopBar from './TopBar'
import { Menu } from 'semantic-ui-react'

//search component for groups goes here as well as an explore component

class Home extends React.Component {

  state = { activeItem: "Your Groups" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });


  render(){
    
    let component;
    const menuChoice = this.state.activeItem;
    let text 
    if (menuChoice === "Your Groups") {
      component =       <UserGroups user={this.props.user}/> 
      text = <h3>Your Groups</h3>

    } else if (menuChoice === "Your Meetups") {
      component = <UserMeetups user={this.props.user} />
      text = <h3>Your Meetups</h3>
    }

      const { activeItem } = this.state;

  return (
    <div>
     
     <TopBar text={"waggr"} />
     <div style={{  marginRight: 'auto', marginLeft: 'auto', width: '70%', height: '10%', marginBottom: '5%'}}>
     <Menu color='purple'  borderless  inverted size='large'    widths={2}>
        <Menu.Item
         style={{ fontWeight: 'bold'}}
          name="Your Groups"
          active={activeItem === "Your Groups"}
          color='teal'
          fitted='horizontally'
          onClick={this.handleItemClick}
        />
        <Menu.Item
                 style={{ fontWeight: 'bold'}}
          name="Your Meetups"
          fitted='horizontally'
          active={activeItem === "Your Meetups"}
          onClick={this.handleItemClick}
        />
      </Menu>
      </div>
    <div id="header"style={{ marginRight: '2em', marginLeft: '2em', marginBottom: '5%'}} > 

    

     
    {text}
    {component} 
   

     
      
      </div>  
      </div>
    
  )} }

export default Home;
