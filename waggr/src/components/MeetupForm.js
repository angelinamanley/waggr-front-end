import React from 'react';
import {Form, Container} from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';
import API from '../adapters/API';
import LocationSearchInput from './LocationSearchInput'




class MeetupForm extends React.Component{ 

    state = { 
        name: null, 
        description: null, 
        datetime: "", 
        location: null, 
        groupId: null

    }

    selectLocation = (location, latitude, longitude) => {
      this.setState( {location, latitude, longitude})
    }

    componentDidMount(){
      this.setState({groupId: this.props.match.params.id})
    }

    handleInputChange = (key, value) => {
        this.setState({
          [key]: value
        })
      }
    
      submit = e => {
        e.preventDefault()
        API.postMeetup({name: this.state.name, description: this.state.description, datetime: this.state.datetime, location: this.state.location, group_id: this.state.groupId }).then(meetup => this.props.history.push(`/meetups/${meetup.id}`))
      }

      handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }


    render(){

            if (!this.state.groupId) {
                return( <div>Loading...</div> )
            } else{

        return(
            <Container>
                <h3>Create a new Meetup</h3> 

                <LocationSearchInput />
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
          value={this.state.datetime}
          iconPosition="left"
          onChange={this.handleChange}
        />

        <Form.Button>Submit</Form.Button>

      </Form>
      </Container>
        )
    }

}



}

export default MeetupForm