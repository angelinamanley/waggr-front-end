import React from 'react';
import allBreeds from '../config/data'
import { Container, Form, Dropdown, Radio, Button, Image, Message} from 'semantic-ui-react'
import API from "../adapters/API";
import TopBar from './TopBar.js'



class AddDogForm extends React.Component{

    state = { 
        name: "", 
        breed: "", 
        birthday: "", 
        gender: "", 
        bio: "", 
        photo: null, 
        errorMessage : false
    }
      handleInputChange = (key, value) => {
        this.setState({
          [key]: value
        })
      }
    
      submit = e => {
        e.preventDefault()
        let dogPhoto
        if (this.state.photo === null || this.state.photo === "") {
           dogPhoto = "https://res.cloudinary.com/angelinashin/image/upload/v1573498535/me6jytfvdhbx1lpatka0.png"
        } else {
           dogPhoto = this.state.photo
        }
        if (!this.state.name ) {
          this.setState({ errorMessage : true })
        } else {
        
        API.addDog({ name: this.state.name, breed: this.state.breed, birthday: this.state.birthday, gender: this.state.gender, bio: this.state.bio, photo: dogPhoto, user_id: this.props.user.id}).then(dog => this.props.addDogtoUser(dog)).then(() => this.props.history.push('/dashboard'))
      } }

      showWidget = () => {
      this.widget.open()
    }

     widget = window.cloudinary.createUploadWidget({ 
      cloudName: "angelinashin", uploadPreset: "zdjpntym" ,  sources: [ 'local', 'url'], resourceType: 'image', cropping: true, croppingAspectRatio : 1, showSkipCropButton: false}, (error, result) => { this.checkUploadResult(result) });


    checkUploadResult = (resultEvent) => {
      if (resultEvent.event === 'success') {
        console.log("success") 
        this.setState({photo: resultEvent.info.secure_url})
      }
    }

        render(){
          
      return(
        <div>
          <TopBar text={'Add A Dog'} />
        <div id="addgroupform" style={{ marginRight: '2em', marginLeft: '2em'}}>
          <Container>
            
             {this.state.photo? <Image centered size='tiny' circular src={this.state.photo} /> : null}
             <div style={{marginTop: '3%'}}>

             <Button size='mini' secondary onClick={this.showWidget}>Upload your pup's picture!  </Button>
            </div>
        <Form size="small" onSubmit={this.submit} >
        {this.state.errorMessage? <Message negative>Please fill in your dog's name.</Message> : null}

        <Form.Input
        required
        label="Name"
          name="name"
          type="text"
          placeholder="name"
          autoComplete="name"
          value={this.state.name}
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
        />
        
        <Dropdown 
        label="Breed"
        placeholder="Select Breed"
        name="breed"
        search
        selection 
        options={allBreeds}
        onChange={(event,data) => this.setState({breed: data.value})}
        />

          <Form.Field>
          <Radio
            label='Female'
            value='Female'
            checked={this.state.gender === 'Female'}
            onChange={() => this.setState({gender: "Female"})}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Male'
            value='Male'
            checked={this.state.gender === 'Male'}
            onChange={() => this.setState({gender: "Male"})}
          />
        </Form.Field>

        <Form.Input
        label="Birthday"
          name="birthday"
          type="date"
          autoComplete="date"
          value={this.state.birthday}
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
        />

            <Form.TextArea
            label="Bio"
          name="bio"
          type="text"
          placeholder="Tell us more about your dog!"
          autoComplete="name"
          value={this.state.bio}
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
        />      

       
        

        <Form.Button primary>Submit</Form.Button>
        </Form>
        </Container>
        </div>
        </div>
      )}

}

export default AddDogForm