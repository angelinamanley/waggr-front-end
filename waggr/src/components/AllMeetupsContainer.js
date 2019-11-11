import React from "react";
import { Card, Image, Button, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Spinner from "./common/Spinner";
import GroupSearchBar from "./GroupSearchBar";
import API from '../adapters/API'

class AllMeetupsContainer extends React.Component {
  state = {
    meetups : null, 
    searchTerm : null
}

  componentDidMount(){
  API.getMeetups().then(meetups => this.setState( {meetups }))
    }  

filterMeetups = () => {
    if (this.state.searchTerm != null) {
  return this.state.meetups.filter(meetup =>
    meetup.name
      .toLocaleLowerCase()
      .includes(this.state.searchTerm.toLocaleLowerCase())
  )} else {
  return this.state.meetups} }

  handleSearchClick = value => {
    this.setState({ searchTerm: value });
}

  render() {
    if (!this.state.meetups) {
      return <Spinner />
    } else {
      const filteredMeetups = this.filterMeetups()
  
      return (
        <React.Fragment>
          <h4>All Meetups</h4>
          {/* <Button as={Link} to='/addgroup' size='mini' primary icon><Icon name="plus circle"/></Button> */}
          <GroupSearchBar handleSearchClick={this.handleSearchClick} />
          <Container>
          <Card.Group centered>
            {filteredMeetups.map(meetup => (
              <Card
                key={meetup.id}
                as={Link}
                to={`/meetups/${meetup.id}`}
              >
                <Card.Content>
                  <Image floated="right" src={meetup.photo} />
                  <Card.Header>{meetup.name}</Card.Header>
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

export default AllMeetupsContainer;
