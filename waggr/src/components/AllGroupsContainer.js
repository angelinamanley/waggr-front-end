import React from "react";
import { Card, Image, Button, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Spinner from "./common/Spinner";
import GroupSearchBar from "./GroupSearchBar";
import API from '../adapters/API'

class AllGroupsContainer extends React.Component {
  state = {
    groups : null, 
    searchTerm : null
}

  componentDidMount(){
  API.getGroups().then(groups => this.setState( {groups }))
    }  

filterGroups = () => {
    if (this.state.searchTerm != null) {
  return this.state.groups.filter(group =>
    group.name
      .toLocaleLowerCase()
      .includes(this.state.searchTerm.toLocaleLowerCase())
  )} else {
  return this.state.groups} }

  handleSearchClick = value => {
    this.setState({ searchTerm: value });
}

  render() {
    if (!this.state.groups) {
      return <Spinner />
    } else {
      const filteredGroups = this.filterGroups()
  
      return (
        <React.Fragment>
          <div style={{ marginRight: 'auto', marginLeft: 'auto', width: '85%', marginTop: '2%'}}>
          <h4>Create a Group  <Button as={Link} to='/addgroup' size='mini' secondary icon><Icon name="plus circle"/></Button></h4>
          </div>
          <GroupSearchBar handleSearchClick={this.handleSearchClick} />
          <Container>
          <Card.Group centered>
            {filteredGroups.map(group => (
              <Card
              style={{width:'85%'}}
              color='violet' 
                key={group.id}
                as={Link}
                to={`/groups/${group.id}`}
              >
                <Card.Content centered>
                  <Image floated="left" size="tiny" src={group.photo} />
                  <Card.Header style={{textAlign : "center"}}>{group.name}</Card.Header>
                </Card.Content>
              </Card>
            ))}
            </Card.Group>
            </Container>
            </React.Fragment>
      )
    }
  }
}

export default AllGroupsContainer;
