import React from 'react';
import {Container, List, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from "moment"
import API from "../adapters/API";


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

        <Container>
            <h1>{meetup.name}</h1>
            {!attending? 
            <Button onClick={()=> this.handleAttendClick(this.props.user.id, meetup.id)} secondary>Attend</Button> :
            <Button secondary onClick={()=>this.handleCancelClick()}> Cancel </Button> }
            { meetup.admin_id === this.props.user.id? 
                <Button as={Link} to={`/meetups/${meetup.id}/edit`}>Edit Meetup</Button> : null }
            <h4><Link to={`/groups/${meetup.group.id}`}>{meetup.group.name}</Link></h4>
            <h4>{meetup.admin_id}</h4>
            <h4>When: {moment(meetup.datetime).format('MMM Do YYYY')}</h4>
            <h4>Where: {meetup.location}</h4>
            <h4>{meetup.description}</h4>
            <h4>Attendees:</h4>
            <List>
            {meetup.attendances.map(attendance => 
                <List.Item > 
                    <Image avatar src={attendance.user.photo} />
                    <List.Content>
                        <List.Header as={Link} to={`/users/${attendance.user.id}`}>{attendance.user.first_name}</List.Header>
                    </List.Content>
                </List.Item>
            
            )}
            </List>

        </Container>



    ) } }
    }

export default MeetupShowPage