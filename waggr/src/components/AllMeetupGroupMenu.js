import React from "react";
import { Menu } from "semantic-ui-react";

  
  

export default class AllMeetupGroupMenu extends React.Component {
    state = { activeItem: "chat" };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name }, ()=>this.props.handleMenuSelect(name));
  

    render(){
        const { activeItem } = this.state;

        return(
        <Menu compact fluid inverted widths={2}color="pink" >
        <Menu.Item
          name="Search Groups"
          active={activeItem === "chat"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Search Meetups"
          active={activeItem === "meetups"}
          onClick={this.handleItemClick}
        />
        </Menu>

        )
    }

}
