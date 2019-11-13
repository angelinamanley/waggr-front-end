import React from 'react';
import {Form, Container, Button, Message} from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';
import API from '../adapters/API';
import LocationSearchInput from './LocationSearchInput'
import moment from "moment";
import TopBar from './TopBar.js'





class EditMeetupForm extends React.Component{ 

    state = { 
        name: null, 
        description: null, 
        datetime: "", 
        location: null, 
        latitude: null, 
        longitude: null, 
        groupId: null, 
        errorView : false 
        

    }

    selectLocation = (location, latitude, longitude) => {
      this.setState( {location, latitude, longitude})
    }

    componentDidMount(){
        API.getMeetup(this.props.match.params.id).then(meetup => 
          this.setState({ 
            name: meetup.name, 
            description: meetup.description, 
            datetime: meetup.datetime, 
            location: meetup.location, 
            latitude: meetup.latitude, 
            longitude: meetup.longitude, 
            groupId: meetup.group.id
           }))
    }



    handleInputChange = (key, value) => {
        this.setState({
          [key]: value
        })
      }

    handleDeleteClick = id => {
      API.deleteMeetup(id).then(() => this.props.history.push(`/groups/${this.state.groupId}`))

    }
    
      submit = e => {
        e.preventDefault()
        if (moment(this.state.datetime) < moment())
        { this.setState({ errorView: true})

        } else {
        API.editMeetup(this.props.match.params.id, {name: this.state.name, description: this.state.description, datetime: this.state.datetime, location: this.state.location,  admin_id: this.props.user.id, latitude: this.state.latitude, longitude: this.state.longitude}).then(meetup => this.props.history.push(`/meetups/${meetup.id}`))
      } }

      handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }


    render(){

            if (!this.state) {
                return( <div>Loading...</div> )
            } else{

        return(
          <div>
          <TopBar text={"Edit Meetup"} />
        <div id="meetupform" style={{ marginRight: '2em', marginLeft: '2em'}}>
    
            <Container>      
       { this.state.errorView? <Message negative>You cannot submit a date in the past!</Message> : null}

            <Form 
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
        <Form.Input
          name="name"
          type="name"
          placeholder="Name of Event"
          autoComplete="name"
          value={this.state.name}
        />
        <Form.Input
          name="description"
          type="text"
          placeholder="Write something about the event"
          autoComplete="text"
          value={this.state.description}
        />
             <Form.Input
          name="location"
          type="location"
          placeholder="Enter postcode"
          autoComplete="post code"
          value={this.state.location}
        />
         <DateTimeInput
          name="datetime"
          placeholder="Date Time"
          value={moment(this.state.datetime).format('MMMM Do YYYY, h:mm:ss a')}
          iconPosition="left"
          onChange={this.handleChange}
        />

      <LocationSearchInput selectLocation={this.selectLocation}/>

        <Form.Button secondary>Submit</Form.Button>

      </Form>
   
      <h4>or</h4>
      <Button size='mini' onClick={()=> this.handleDeleteClick(this.props.match.params.id)}>Delete Meetup</Button>
  
      </Container>
      </div></div>
        )
    }

}



}

export default EditMeetupForm