import React from 'react';
import allBreeds from '../config/data'
import { Container, Form, Dropdown, Radio, Button, Image } from 'semantic-ui-react'
import API from "../adapters/API";



class EditDogForm extends React.Component{

    state = { 
        name: "", 
        breed: "", 
        birthday: "", 
        gender: "", 
        bio: "", 
        photo: "", 
        dog: ""
    }


  
    componentDidMount(){ 
      API.getDog(this.props.match.params.id).then(dog => this.setState({ dog }))
    }
  
      handleInputChange = (key, value) => {
        this.setState({
          [key]: value
        })
      }
    
      submit = e => {
        e.preventDefault()
        API.addDog({ name: this.state.name, breed: this.state.breed, birthday: this.state.birthday, gender: this.state.gender, bio: this.state.bio, photo: this.state.photo, user_id: this.props.user.id}).then(API.getUser(this.props.user.id).then(user => this.props.refreshUser(user))).then(() => this.props.history.push('/dashboard'))
      }

      showWidget = () => {
      this.widget.open()
    }

     widget = window.cloudinary.createUploadWidget({ 
      cloudName: "angelinashin", uploadPreset: "zdjpntym" , sources: [ 'local', 'url'],resourceType: 'image', cropping: true, croppingAspectRatio : 1, showSkipCropButton: false}, (error, result) => { this.checkUploadResult(result) });


    checkUploadResult = (resultEvent) => {
      if (resultEvent.event === 'success') {
        console.log("success") 
        this.setState({photo: resultEvent.info.secure_url})
      }
    }

        render(){
          
      return(
          <Container>
            <Image size='mini' src={this.state.dog.photo} />
             <Button secondary onClick={this.showWidget}>Upload your pup's picture!  </Button>
        <Form onSubmit={this.submit} >
        <Form.Input
        label="Name"
          name="name"
          type="text"
          placeholder="name"
          autoComplete="name"
          value={this.state.dog.name}
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
        />
        
        <Dropdown 
        label="Breed"
        placeholder="Select Breed"
        name="breed"
        search
        selection
        value={this.state.dog.breed}
        options={allBreeds}
        onChange={(event,data) => this.setState({breed: data.value})}
        />

          <Form.Field>
          <Radio
            label='Female'
            value='Female'
            checked={this.state.dog.gender === "Female"}
            onChange={() => this.setState({gender: "female"})}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Male'
            value='Male'
            checked={this.state.dog.gender === 'male'}
            onChange={() => this.setState({gender: "male"})}
          />
        </Form.Field>

        <Form.Input
        label="Birthday"
          name="birthday"
          type="date"
          autoComplete="date"
          value={this.state.dog.birthday}
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
        />

            <Form.TextArea
            label="Bio"
          name="bio"
          type="text"
          placeholder="Tell us more about your dog!"
          autoComplete="name"
          value={this.state.dog.bio}
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
        />      

       
        

        <Form.Button>Submit</Form.Button>
        </Form>
        </Container>
      )}

}

export default EditDogForm