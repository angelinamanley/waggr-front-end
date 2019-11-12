import React from "react";
import { Menu } from "semantic-ui-react";

export default class GroupShowMenu extends React.Component {
  
  
  state = { activeItem: "chat" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name }, ()=>this.props.handleMenuSelect(name));

  render() {
    const { activeItem } = this.state;

    return (
      <Menu color="teal" size='tiny' tabular  widths={3}>
        <Menu.Item
          name="about"
          active={activeItem === "about"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="chat"
          active={activeItem === "chat"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="meetups"
          active={activeItem === "meetups"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
