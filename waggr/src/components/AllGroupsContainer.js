import React from "react";
import { Card, Image, Button, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Spinner from "./common/Spinner";
import GroupSearchBar from "./GroupSearchBar";

class AllGroupsContainer extends React.Component {



  // filterGroups = () => {
  //   if (this.props.groups) {return this.props.groups.filter(group =>
  //     group.name
  //       .toLocaleLowerCase()
  //       .includes(this.state.searchTerm.toLocaleLowerCase())
  //   )}
  // }

  render() {
    if (!this.props.groups) {
      return <Spinner />
    } else {
      // const filteredGroups = this.filterGroups();
      return (
        <div>
          <h2>All Groups<Button as={Link} to='/addgroup' size='mini' primary icon><Icon name="plus circle"/></Button></h2>
          <GroupSearchBar handleSearchClick={this.props.handleSearchClick} />
          <Container>
          <Card.Group centered>
            {this.props.groups.map(group => (
              <Card
                key={group.id}
                as={Link}
                to="/group"
                onClick={() => this.props.selectGroup(group)}
              >
                <Card.Content>
                  <Image floated="right" src={group.photo} />
                  <Card.Header>{group.name}</Card.Header>
                </Card.Content>
              </Card>
            ))}
            </Card.Group>
            </Container>
        </div>
      )
    }
  }
}

export default AllGroupsContainer;
