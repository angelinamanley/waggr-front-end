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
    cloudName: "angelinashin", uploadPreset: "zdjpntym", sources: [ 'local', 'url'],  cropping: true, croppingAspectRatio : 1, showSkipCropButton: false}, (error, result) => { this.checkUploadResult(result) });


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
        <Button onClick={this.showWidget}>Upload Picture</Button>
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

          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default EditDogForm;
