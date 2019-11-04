import React from 'react';
import {Form, Container} from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';
import API from '../adapters/API';




class MeetupForm extends React.Component{ 

    state = { 
        name: null, 
        description: null, 
        datetime: null, 
        location: null, 

    }

    handleInputChange = (key, value) => {
        this.setState({
          [key]: value
        })
      }
    
      submit = e => {
        e.preventDefault()
        API.postMeetup({name: this.state.name, description: this.state.description, datetime: this.state.datetime, location: this.state.location, group_id: this.props.group.id }).then(()=> this.props.getGroups()).then(() => this.props.history.push('/group'))
        // API.signup({ email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation, first_name: this.state.first_name, last_name: this.state.last_name}).then(
        //   user => this.props.login(user)
        // )
      }

      handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }


    render(){

            if (!this.props.group) {
                return( <div>Loading...</div> )
            } else{

        return(
            <Container>
                <h3>Create a new Meetup for {this.props.group.name}</h3> 
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