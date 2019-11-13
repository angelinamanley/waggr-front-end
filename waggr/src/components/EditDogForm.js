import React from 'react';
import allBreeds from '../config/data'
import { Container, Form, Dropdown, Radio, Button, Image } from 'semantic-ui-react'
import API from "../adapters/API";
import TopBar from './TopBar.js'



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
      API.getDog(this.props.match.params.id).then(dog => this.setState({ id: dog.id, 
        name: dog.name, breed: dog.breed, birthday: dog.birthday, gender: dog.gender, bio: dog.bio, photo: dog.photo}))
    }
  
      handleInputChange = (key, value) => {
        console.log(key, value)
        this.setState({
          [key]: value
        })
      }
    
      submit = e => {
        e.preventDefault()
        API.editDog(this.props.match.params.id, { name: this.state.name, breed: this.state.breed, birthday: this.state.birthday, gender: this.state.gender, bio: this.state.bio, photo: this.state.photo, user_id: this.props.user.id}).then(() => this.props.history.push('/dashboard'))
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

    deleteDog = () => {
    API.deleteDog(parseInt(this.props.match.params.id)).then(() => this.props.removeDog(parseInt(this.props.match.params.id))).then(() => this.props.history.push('/dashboard'))
    }

        render(){
          
      return(
        <div>
        <TopBar text={'Edit Dog'} />
      <div id="editdogform" style={{ marginRight: '2em', marginLeft: '2em'}}>
          <Container>
             {this.state.photo? <Image size='small' centered circular src={this.state.photo} /> : null}   
             <div style={{marginTop: '3%'}}>
             <Button size="mini" secondary onClick={this.showWidget}>Upload your pup's picture!  </Button>
             </div>
        <Form  size='small' onSubmit={this.submit} >
        <Form.Input
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
        value={this.state.breed}
        options={allBreeds}
        onChange={(event,data) => this.setState({breed: data.value})}
        />

          <Form.Field>
          <Radio
            label='Female'
            value='Female'
            checked={this.state.gender === "Female"}
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
        <b4></b4>
        <Button size="mini"  onClick={ ()=>this.deleteDog()}>Remove Dog</Button>
        </Container>
        </div>
        </div>
      )}

}

export default EditDogForm