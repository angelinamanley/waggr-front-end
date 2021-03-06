import React from "react";
import { Input } from "semantic-ui-react";

export default class GroupSearchBar extends React.Component {
  state = {
    searchTerm: null
  };

  onSubmit = event => {
      event.preventDefault()

      this.props.handleSearchClick(this.state.searchTerm)
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({ searchTerm: event.target.value })
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
      <div style={{ marginRight: 'auto', marginLeft: 'auto', width: '80%', marginTop: '3%', marginBottom: '5%'}}>
      <Input style={{width: '100%'}} action={ {icon : 'x', onClick : () => this.clearSearchTerm()}} onChange={e => this.handleChange(e)} placeholder="Search" />
      
      
      
      
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