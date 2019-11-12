import React from "react";
import { Container, Form, Button } from "semantic-ui-react";
import API from "../adapters/API";

class EditDogForm extends React.Component {
  state = {
    name: null, 
    description: null, 
    photo: null
  };


  componentDidMount(){
    API.getGroup(this.props.match.params.id)
    .then(group => this.setState({
      name: group.name,
    description: group.description, 
    photo: group.photo, 
    id: group.id

  }))
  }

  checkUploadResult = resultEvent => {
    if (resultEvent.event === "success") {
      console.log("success");
      this.setState({ photo: resultEvent.info.secure_url });
    }
  };

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  handleDeleteClick = id => {
    API.deleteGroup(id).then(() => this.props.removeGroupFromUser(id)).then(() => this.props.history.push('/home'))
  }

  submit = e => {
    e.preventDefault();
    API.editGroup({
      name: this.state.name,
      description: this.state.description,
      photo: this.state.photo,
    }, this.state.id)
      .then(() => this.props.history.push("/groups"));
  };

     showWidget = () => {
    this.widget.open()
  }

  widget = window.cloudinary.createUploadWidget({ 
    cloudName: "angelinashin", uploadPreset: "cswhfpzj", sources: [ 'local', 'url'],  cropping: true, croppingAspectRatio : 1.4, showSkipCropButton: true}, (error, result) => { this.checkUploadResult(result) });


  checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {
      console.log("success") 
      this.setState({photo: resultEvent.info.secure_url})
    }
  }

  render() {
    if (!this.state.name){
      return <div>loading form...</div>
    }
    return (
      <Container>
          <h2>Edit Group</h2>
        <Button secondary onClick={this.showWidget}>Upload Picture</Button>
        <Form onSubmit={this.submit}>
          <Form.Input
            label="Name"  
            name="name"
            type="text"
            placeholder="name"
            autoComplete="name"
            value={this.state.name}
            onChange={e =>
              this.handleInputChange(e.target.name, e.target.value)
            }
          />

          <Form.TextArea
            label="description"
            name="description"
            type="text"
            placeholder="Tell us more about your group!"
            autoComplete="text"
            value={this.state.description}
            onChange={e =>
              this.handleInputChange(e.target.name, e.target.value)
            }
          />

          <Form.Button primary>Submit</Form.Button>
        </Form>
        <h4>or</h4>
      <Button primary onClick={()=> this.handleDeleteClick(this.props.match.params.id)}>Delete Group</Button>
  
      </Container>
    );
  }
}

export default EditDogForm;
