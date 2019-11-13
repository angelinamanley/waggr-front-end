import React from "react";
import { Container, Form, Button, Image, Message} from "semantic-ui-react";
import API from "../adapters/API";
import TopBar from './TopBar.js'


class EditDogForm extends React.Component {
  state = {
    name: null, 
    description: null, 
    photo: null,
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
  } 

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
    if (!this.state){
      return <div>loading form...</div>
    }
    return (
      <div>
      <TopBar text={"Edit Group"} />
    <div id="editgroupform" style={{ marginRight: '2em', marginLeft: '2em'}}>

      <Container>

      <Image src={this.state.photo}  size="small" />
          <div style={{marginTop: '2%'}}>
        <Button secondary onClick={this.showWidget}>Upload Picture</Button>
        </div>
        <Form onSubmit={this.submit}>
          <Form.Input
          required
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
          required
            label="Description"
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
            <h2></h2>
      <Button size="mini" onClick={()=> this.handleDeleteClick(this.props.match.params.id)}>Delete Group</Button>
  
      </Container>
      </div>
      </div>
    );
  }
}

export default EditDogForm;
