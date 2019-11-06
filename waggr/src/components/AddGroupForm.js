import React from "react";
import { Container, Form, Dropdown, Radio, Button } from "semantic-ui-react";
import API from "../adapters/API";

class AddGroupForm extends React.Component {
  state = {
    name: "",
    description: "",
    photo: ""
  };

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
    API.postGroup({
      name: this.state.name,
      description: this.state.descrption,
      photo: this.state.photo,
      admin_id: this.props.user.id
    })
      .then( group => 
        this.props.addGrouptoGroups(group)
      )
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
    return (
      <Container>
          <h3>Create a Group</h3>
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

export default AddGroupForm;
