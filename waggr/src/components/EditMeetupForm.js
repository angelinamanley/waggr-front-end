import React from 'react';
import {Form, Container, Button} from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';
import API from '../adapters/API';
import LocationSearchInput from './LocationSearchInput'
import moment from "moment";




class EditMeetupForm extends React.Component{ 

    state = { 
        name: null, 
        description: null, 
        datetime: "", 
        location: null, 
        groupId: null, 
        meetup: null

    }

    selectLocation = (location, latitude, longitude) => {
      this.setState( {location, latitude, longitude})
    }

    componentDidMount(){
        API.getMeetup(this.props.match.params.id).then(meetup => this.setState({ meetup }))
    }



    handleInputChange = (key, value) => {
        this.setState({
          [key]: value
        })
      }

    handleDeleteClick = id => {
      API.deleteMeetup(id).then(() => this.props.history.push(`/groups/${this.state.meetup.group.id}`))

    }
    
      submit = e => {
        e.preventDefault()
        API.editMeetup(this.state.meetup.id, {name: this.state.name, description: this.state.description, datetime: this.state.datetime, location: this.state.location, group_id: this.state.groupId, admin_id: this.props.user.id }).then(meetup => this.props.history.push(`/meetups/${meetup.id}`))
      }

      handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }


    render(){

            if (!this.state.meetup) {
                return( <div>Loading...</div> )
            } else{

        return(
    
            <Container>
                <h3>Edit {this.state.meetup.name}</h3> 
            
            <Form 
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
        <Form.Input
          name="name"
          type="name"
          placeholder="Name of Event"
          autoComplete="name"
          value={this.state.meetup.name}
        />
        <Form.Input
          name="description"
          type="text"
          placeholder="Write something about the event"
          autoComplete="text"
          value={this.state.meetup.description}
        />
             <Form.Input
          name="location"
          type="location"
          placeholder="Enter postcode"
          autoComplete="post code"
          value={this.state.meetup.location}
        />
         <DateTimeInput
          name="datetime"
          placeholder="Date Time"
          value={moment(this.state.meetup.datetime).format('MMMM Do YYYY, h:mm:ss a')}
          iconPosition="left"
          onChange={this.handleChange}
        />

      <LocationSearchInput selectLocation={this.selectLocation}/>

        <Form.Button secondary>Submit</Form.Button>

      </Form>
   
      <h4>or</h4>
      <Button primary onClick={()=> this.handleDeleteClick(this.state.meetup.id)}>Delete Meetup</Button>
  
      </Container>
        )
    }

}



}

export default EditMeetupForm