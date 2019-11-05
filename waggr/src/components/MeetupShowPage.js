import React from 'react';
import {Container, List, Image} from 'semantic-ui-react'
import moment from "moment"

const MeetupShowPage = props => {

    if (!props.meetup) {
        return( <div>Loading..</div>)
    } else {

    return(
        <Container>
            <h1>{props.meetup.name}</h1>
            <h4>When: {moment(props.meetup.datetime).format('MMM Do YYYY')}</h4>
            <h4>Where: {props.meetup.location}</h4>
            <h4>{props.meetup.description}</h4>
            <h4>Attendees:</h4>
            <List>
            {props.meetup.attendances.map(attendance => 
                <List.Item> 
                    <Image avatar src={attendance.user.photo} />
                    <List.Content>
                        <List.Header as='a'>{attendance.user.first_name}</List.Header>
                    </List.Content>
                </List.Item>
            
            )}
            </List>

        </Container>



    ) }
    }

export default MeetupShowPage