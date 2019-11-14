import React from "react";
import { List, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Spinner from "./common/Spinner";
import GroupSearchBar from "./GroupSearchBar";
import API from '../adapters/API'
import moment from 'moment'
import Logo from './common/waggrlogo4.png'
import DateRangePicker from './DateRangePicker'


class AllMeetupsContainer extends React.Component {
  state = {
    meetups : null, 
    searchTerm : null,
    dateSearch: false, 
    toggleDateSearch: false 
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

filterMeetupsByDate = (meetups) => {
  if (this.state.startDate && this.state.endDate) {
    return meetups.filter(meetup => moment(meetup.datetime).format('LLL') < this.state.endDate && moment(meetup.datetime).format('LLL') > this.state.startDate)
  } else {
    return meetups
  }
}


setDateRange = (startDate, endDate) => {
  this.setState({ startDate, endDate, toggleDateSearch: true })

}

  render() {
    if (!this.state.meetups) {
      return <Spinner />
    } else {
      const filteredMeetups = this.sortMeetups(this.filterMeetupsByDate(this.filterMeetups()))
      // const filteredMeetups = this.filterMeetupsByDate(this.state.meetups)

      let dateButton
      if (this.state.toggleDateSearch && !this.state.dateSearch){
        dateButton = <Button size='mini' onClick={()=> this.setState({ startDate: '', endDate: '', toggleDateSearch: false})}>Clear Dates </Button>
      } else if (this.state.dateSearch ){
        dateButton = <Button size='mini' secondary onClick={()=>this.setState({dateSearch : false})}>Close Calendar</Button> 
       } else {
         dateButton = <Button size='mini'  secondary onClick={()=>this.setState({dateSearch: true})}>Search by date</Button>
       }


  
      return (
        <React.Fragment>
           {/* {!this.state.dateSearch? <Button secondary onClick={()=>this.setState({dateSearch: true})}>Search by date</Button> */}
    {/* : <Button secondary onClick={()=>this.setState({dateSearch : false})}>Close Calendar</Button> } */}
      <div style={{marginLeft: '5%', marginTop: '5%'}}>{dateButton}</div>
          {this.state.dateSearch? <DateRangePicker setDateRange={this.setDateRange} /> : null}
        
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
