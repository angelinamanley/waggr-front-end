import React from "react";
import { Container, Form, Button } from "semantic-ui-react";
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
    let groupPhoto
    if (this.state.photo === null || this.state.photo === "") {
      groupPhoto = "https://res.cloudinary.com/angelinashin/image/upload/v1573500085/vyfus5leriqaxmncuz5w.jpg"
   } else {
      groupPhoto = this.state.photo
   }
    API.postGroup({
      name: this.state.name,
      description: this.state.description,
      photo: groupPhoto,
      admin_id: this.props.user.id
    })
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
