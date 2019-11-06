import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react'
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
        API.signup({ email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation, first_name: this.state.first_name, last_name: this.state.last_name}).then(
          user => this.props.login(user)
        )
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
        <Form.Input
          name="email"
          type="email"
          placeholder="email"
          autoComplete="email"
          value={this.state.email}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="password"
          autoComplete="new-password"
          value={this.state.password}
        />
             <Form.Input
          name="password_confirmation"
          type="password"
          placeholder="password confirmation"
          autoComplete="new-password"
          value={this.state.password_confirmation}
        />
             <Form.Input
          name="first_name"
          type="text"
          placeholder="First Name"
          autoComplete="name"
          value={this.state.first_name}
        />
        <Form.Input
          name="last_name"
          type="text"
          placeholder="Last Name"
          autoComplete="name"
          value={this.state.last_name}
        />
         <Form.Input
          name="last_name"
          type="text"
          placeholder="Last Name"
          autoComplete="name"
          value={this.state.last_name}
        />
         <Form.TextArea
          name="aboutme"
          type="text"
          placeholder="Tell us more about you "
          autoComplete="text"
          value={this.state.aboutme}
        />

        <Form.Button>Submit</Form.Button>

      </Form>
      </Container>
      </div>
        )
    }




}

export default SignUpForm
