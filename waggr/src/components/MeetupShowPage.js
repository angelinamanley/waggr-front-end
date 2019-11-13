import React from 'react';
import {Container, List, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from "moment"
import API from "../adapters/API";
import TopBar from './TopBar.js'
// import MeetupMap from './MeetupMap.js'


class MeetupShowPage extends React.Component{

    state = {
        meetup : null 
    }

    componentDidMount(){
        API.getMeetup(this.props.match.params.id).then(meetup => this.setState({ meetup}))
    }

    handleAttendClick = () => {
        let newAttendances = [...this.state.meetup.attendances]
        API.postAttendance(this.props.user.id, this.state.meetup.id).then(attendance => this.setState({meetup: {...this.state.meetup, attendances: [...newAttendances, attendance]}}))
    }

    findAttendanceId = () => {
    return this.state.meetup.attendances.find(
      attendance => attendance.user.id === this.props.user.id
    ).id }


    handleCancelClick = () => {
        let attendanceId = this.findAttendanceId()
        let newAttendances = this.state.meetup.attendances.filter(attendance => attendance.user.id !== this.props.user.id)
        API.cancelAttendance(attendanceId).then(this.setState({ meetup: {...this.state.meetup, attendances: newAttendances}}))
    }

    render() {
    if (!this.props.user || !this.state.meetup) {
        return( <div>Loading..</div>)
    } else {

        const attending = this.state.meetup.attendances.find(attendance => attendance.user.id === this.props.user.id)
        const {meetup} = this.state 

    return(
        <div>
        <TopBar text={meetup.name} />
      <div id="addgroupform" style={{ marginRight: '1em', marginLeft: '1em'}}>
        <Container>
            
            {!attending? 
            <Button size="mini" onClick={()=> this.handleAttendClick(this.props.user.id, meetup.id)} secondary>Attend</Button> :
            <Button secondary size="mini" onClick={()=>this.handleCancelClick()}> Cancel </Button> }
            { meetup.admin_id === this.props.user.id? 
                <Button size="mini" as={Link} to={`/meetups/${meetup.id}/edit`}>Edit Meetup</Button> : null }
            <p><b><br></br><Link to={`/groups/${meetup.group.id}`}>Group: {meetup.group.name}</Link></b></p>
            <p><b>When: {moment(meetup.datetime).format('MMM Do YYYY')}</b></p>
            <p><b>Where: {meetup.location}</b></p>
            <p><b>{meetup.description}</b></p>

            {/* <MeetupMap meetup={this.state.meetup}/> */}


                <div>
            <h4>Attendees:</h4>
            <List>
            {meetup.attendances.map(attendance => 
                <List.Item key={attendance.user.id} > 
                    <Image avatar src={attendance.user.photo} />
                    <List.Content>
                        <List.Header as={Link} to={`/users/${attendance.user.id}`}>{attendance.user.first_name}</List.Header>
                    </List.Content>
                </List.Item>
            
            )}
            </List>
            </div>

        </Container>
           </div>
           </div>


    ) } }
    }

export default MeetupShowPage