import React from "react";
import { Form, Button, Icon, Input } from "semantic-ui-react";

export default class GroupSearchBar extends React.Component {
  state = {
    searchTerm: null
  };

  onSubmit = event => {
      event.preventDefault()

      this.props.handleSearchClick(this.state.searchTerm)
  }

    clearSearchTerm = () => {
    this.setState({
        searchTerm: ''
    })
    this.props.handleSearchClick('')
}

  
  render() {
    return (
      <div>
      <Input action={ {icon : 'search', onClick : event => this.onSubmit(event)}} onChange={e => this.setState({ searchTerm: e.target.value })} fluid  placeholder="Search" />
      
      
      
      
      {/* <Form onSubmit={event => this.onSubmit(event)} >
          <Form.Group>
      <Form.Input
        onChange={e => this.setState({ searchTerm: e.target.value })}
        placeholder="Find a group"
        />

        <Form.Button primary icon><Icon name='search'/></Form.Button>
        <Button secondary icon onClick={this.clearSearchTerm}><Icon name='x'/></Button>
        </Form.Group>
        </Form> */}
        </div>
        
    );
  }
}