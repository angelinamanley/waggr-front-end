import React from "react";
import { Form } from "semantic-ui-react";

export default class MapSearchBar extends React.Component {
  state = {
    userLocation: null
  };

  onSubmit = event => {
      event.preventDefault()
      this.props.setLocation(this.state.userLocation)
  }

  render() {
    return (
      <Form onSubmit={event => this.onSubmit(event)} >
          <Form.Group>
      <Form.Input
        onChange={e => this.setState({ userLocation: e.target.value })}
        placeholder="Enter your location..."
        />
        <Form.Button content='Search' />
        </Form.Group>
        </Form>
        
    );
  }
}
