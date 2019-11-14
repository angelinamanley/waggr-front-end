import React from "react";
import { List, Image, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Spinner from "./common/Spinner";
import GroupSearchBar from "./GroupSearchBar";
import API from '../adapters/API'
import moment from 'moment'
import Logo from './common/waggrlogo4.png'

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

sortMeetups = (meetups) => {
  return meetups.sort((a, b) => moment(a.datetime).format('X')-moment(b.datetime).format('X')) 

}

  render() {
    if (!this.state.meetups) {
      return <Spinner />
    } else {
      const filteredMeetups = this.sortMeetups(this.filterMeetups())
  
      return (
        <React.Fragment>
     
          {/* <Button as={Link} to='/addgroup' size='mini' primary icon><Icon name="plus circle"/></Button> */}
          <GroupSearchBar handleSearchClick={this.handleSearchClick} />
          <div style={{width : '85%', marginRight: 'auto', marginLeft: 'auto'}}>
            <List fluid divided>
            {filteredMeetups.map(meetup => (
              <List.Item
              color='violet' 
                key={meetup.id}
                as={Link}
                to={`/meetups/${meetup.id}`}
              >
          <Image size='mini' src={Logo}/>

                <List.Content>
                  <List.Header>{meetup.name}</List.Header>
                  <List.Description>{moment(meetup.datetime).format('LLL')}</List.Description>
                </List.Content>
              </List.Item>
            ))}
            </List>
            </div>
            </React.Fragment>
      )
    }
  }
}

export default AllMeetupsContainer;
