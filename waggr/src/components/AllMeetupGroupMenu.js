import React from "react";
import { Menu } from "semantic-ui-react";

  
  

export default class AllMeetupGroupMenu extends React.Component {
    state = { activeItem: "Search Groups" };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name }, ()=>this.props.handleMenuSelect(name));
  

    render(){
        const { activeItem } = this.state;

        return(
          <div id="menu" style={{fontSize: "120%", fontWeight: 'bold', color: '#14B89C', height: '10%'}} > 
        <Menu size='massive' pointing fluid widths={2} secondary color="teal"  >
        <Menu.Item 
          style={{marginBottom: '2%'}}
          name="Search Groups"
          active={activeItem === "Search Groups"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Search Meetups"
          style={{marginBottom: '2%'}}
          active={activeItem === "Search Meetups"}
          onClick={this.handleItemClick}
        />
        </Menu>
        </div>

        )
    }

}
