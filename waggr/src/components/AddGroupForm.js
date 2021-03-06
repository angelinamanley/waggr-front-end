import React from "react";
import { Container, Form, Button, Image, Message } from "semantic-ui-react";
import API from "../adapters/API";
import TopBar from './TopBar.js'

class AddGroupForm extends React.Component {
  state = {
    name: "",
    description: "",
    photo: "", 
    errorMessage : false
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
    }).then(group => {this.props.addGrouptoUser(group)
      this.props.history.push(`/groups/${group.id}`)})
  };

     showWidget = () => {
    this.widget.open()
  }

   widget = window.cloudinary.createUploadWidget({ 
    cloudName: "angelinashin", uploadPreset: "cswhfpzj", sources: [ 'local', 'url'],  cropping: true, croppingAspectRatio : 1.5, showSkipCropButton: false}, (error, result) => { this.checkUploadResult(result) });


  checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {
      console.log("success") 
      this.setState({photo: resultEvent.info.secure_url})
    }
  }

  render() {
    return (

      <div>
        <TopBar text={"Create a Group"} />
      <div id="addgroupform" style={{ marginRight: '1em', marginLeft: '1em'}}>

      <Container>
        {this.state.errorMessage? <Message negative>Please fill in all fields.</Message> : null}
          <Image src={this.state.photo}  size="small" />
          <div style={{marginTop: '2%'}}>
        <Button secondary onClick={this.showWidget}>Upload Picture</Button>
        </div>
        <Form onSubmit={this.submit}> 
          <Form.Input
            label="Name"
            required
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
            required
            placeholder="Tell us more about your group!"
            autoComplete="text"
            value={this.state.description}
            onChange={e =>
              this.handleInputChange(e.target.name, e.target.value)
            }
          />

          <Form.Button primary>Submit</Form.Button>
        </Form>
      </Container>
      </div>
      </div>
    );
  }
}

export default AddGroupForm;
