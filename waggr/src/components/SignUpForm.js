import React from 'react';
import { Container, Button } from 'semantic-ui-react'
import {Form, Input, TextArea} from 'semantic-ui-react-form-validator'
import API from '../adapters/API';



class SignUpForm extends React.Component{


    state = {
        email: null, 
        password: null, 
        password_confirmation: null, 
        first_name: null, 
        last_name: null, 
        aboutme: null, 
        photo: null 
    }

    handleInputChange = (key, value) => {
        this.setState({
          [key]: value
        })
      }
    
      submit = e => {
        e.preventDefault()
        console.log(this.state.password === this.state.password_confirmation)
        if (this.state.password === this.state.password_confirmation) {
          API.signup({ email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation, first_name: this.state.first_name, last_name: this.state.last_name, aboutme: this.state.aboutme, photo: this.state.photo}).then(
            user => this.props.login(user)) 
          } else {
          alert("Password and password confirmation do not match.  Please try again")
        }
      }

      showWidget = () => {
        this.widget.open()
      }
  
       widget = window.cloudinary.createUploadWidget({ 
        cloudName: "angelinashin", uploadPreset: "zdjpntym" , cropping: true, croppingAspectRatio : 1, showSkipCropButton: false}, (error, result) => { this.checkUploadResult(result) });
  
  
      checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {
          console.log(resultEvent.info.secure_url) 
          this.setState({photo: resultEvent.info.secure_url})
        }
      } 

    render(){
        return( 
            <div>
                <Container>
                <Button secondary onClick={this.showWidget}>Upload a Profile Picture </Button>
            <Form 
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
        <Input
          name="email"
          type="email"
          validators={['required']}
          errorMessages={['this field is required']} 
          placeholder="email"
          autoComplete="email"
          value={this.state.email}
        />
        <Input
          name="password"
          type="password"
          validators={['required']}
          errorMessages={['this field is required']} 
          placeholder="password"
          autoComplete="new-password"
          value={this.state.password}
        />
             <Input
          name="password_confirmation"
          type="password"
          placeholder="password confirmation"
          validators={['required']}
          errorMessages={['this field is required']} 
          autoComplete="new-password"
          value={this.state.password_confirmation}
        />
             <Input
          name="first_name"
          type="text"
          validators={['required']}
          errorMessages={['this field is required']} 
          placeholder="First Name"
          autoComplete="name"
          value={this.state.first_name}
        />
        <Input
          name="last_name"
          type="text"
          validators={['required']}
          errorMessages={['this field is required']} 
          placeholder="Last Name"
          autoComplete="name"
          value={this.state.last_name}
        />
         <TextArea
          name="aboutme"
          type="textarea"
          validators={['required']}
          errorMessages={['this field is required']} 
          placeholder="Tell us more about you "
          autoComplete="text"
          value={this.state.aboutme}
        />

        <Button>Submit</Button>

      </Form>
      </Container>
      </div>
        )
    }




}

export default SignUpForm
