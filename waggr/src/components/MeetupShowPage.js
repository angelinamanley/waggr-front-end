import React from 'react';
import {Container, List, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from "moment"
import API from "../adapters/API";


const MeetupShowPage = props => {

    const handleAttendClick = () => {
        API.postAttendance(props.user.id, props.meetup.id).then(attendance => props.addAttendance(attendance))
    }

    const findAttendanceId = () => {
    return props.meetup.attendances.find(
      attendance => attendance.user.id === props.user.id
    ).id }


    const handleCancelClick = () => {
        let attendanceId = findAttendanceId()
        API.cancelAttendance(attendanceId).then(props.removeAttendance(attendanceId))
    }

    if (!props.meetup || !props.user) {
        return( <div>Loading..</div>)
    } else {

        const attending = props.meetup.attendances.find(attendance => attendance.user.id === props.user.id)
    

        

    return(
        <Container>
            <h1>{props.meetup.name}</h1>
            {!attending? 
            <Button onClick={()=> handleAttendClick(props.user.id, props.meetup.id)} secondary>Attend</Button> :
            <Button secondary onClick={()=>handleCancelClick()}> Cancel </Button> }
            <h4>When: {moment(props.meetup.datetime).format('MMM Do YYYY')}</h4>
            <h4>Where: {props.meetup.location}</h4>
            <h4>{props.meetup.description}</h4>
            <h4>Attendees:</h4>
            <List>
            {props.meetup.attendances.map(attendance => 
                <List.Item > 
                    <Image avatar src={attendance.user.photo} />
                    <List.Content>
                        <List.Header as={Link} to="/usershow" onClick={() => props.selectUser(attendance.user.id)}>{attendance.user.first_name}</List.Header>
                    </List.Content>
                </List.Item>
            
            )}
            </List>

        </Container>



    ) }
    }

export default MeetupShowPage