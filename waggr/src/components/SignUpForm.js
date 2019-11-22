import React from "react";
import {
  Container,
  Button,
  Message,
  Image,
  Divider,
  Form

} from "semantic-ui-react";
import { Link } from "react-router-dom";
import API from "../adapters/API";
import Logo from "./common/icon.png";

class SignUpForm extends React.Component {
  state = {
    email: null,
    password: null,
    password_confirmation: null,
    first_name: null,
    last_name: null,
    aboutme: null,
    photo:
      "https://res.cloudinary.com/angelinashin/image/upload/v1573498751/ggxpkzje457qy9s8awnk.png"
  };

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  submit = e => {
    e.preventDefault();
    let profilePic;
    if (this.state.photo === null || this.state.photo === "") {
      profilePic =
        "https://res.cloudinary.com/angelinashin/image/upload/v1573498751/ggxpkzje457qy9s8awnk.png";
    } else {
      profilePic = this.state.photo;
    }
    if (this.state.password === this.state.password_confirmation) {
      API.signup({
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        aboutme: this.state.aboutme,
        photo: profilePic
      })
        .then(user => this.props.login(user))
        .catch(error => this.setState({ errorMessage: error.errors[0] }));
    } else {
      this.setState({
        passwordMatchError:
          "Password and password confirmation do not match.  Please try again"
      });
    }
  };

  showWidget = () => {
    this.widget.open();
  };

  widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "angelinashin",
      uploadPreset: "zdjpntym",
      cropping: true,
      croppingAspectRatio: 1
      , sources: [ 'local', 'url'],
      showSkipCropButton: false
    },
    (error, result) => {
      this.checkUploadResult(result);
    }
  );

  checkUploadResult = resultEvent => {
    if (resultEvent.event === "success") {
      this.setState({ photo: resultEvent.info.secure_url });
    }
  };

  render() {
    return (
      <div>
        <Container
          style={{ paddingTop: "5px", paddingBottom: "0px" }}
          textAlign="center"
        >
          <div
            style={{
              fontSize: "200%",
              fontWeight: "bold",
              color: "#14B89C",
              paddingTop: "2px",
              paddingBottom: "0px"
            }}
            textAlign="center"
          >
            {" "}
            <Image
              style={{ maxWidth: "15%" }}
              verticalAlign="middle"
              src={Logo}
            />
            waggr
          </div>
        </Container>
        <Divider />

        <div id="signupform" style={{ marginRight: "2em", marginLeft: "2em" }}>
          <h3>Sign Up</h3>
          <Image src={this.state.photo} centered circular size="tiny" />
          <div
            style={{
              textAlign: "center",
              marginTop: "1em",
              marginBottom: "1em"
            }}
          >
            <Button size="mini" secondary onClick={this.showWidget}>
              Upload a Profile Picture{" "}
            </Button>
          </div>
          {this.state.errorMessage ? (
            <div>
              <Message negative>{this.state.errorMessage}</Message>
            </div>
          ) : null}
          {this.state.passwordMatchError ? (
            <div>
              <Message negative>{this.state.passwordMatchError}</Message>
            </div>
          ) : null}
          <Form
          size="mini"
            onSubmit={this.submit}
            onChange={e =>
              this.handleInputChange(e.target.name, e.target.value)
            }
          >
            <Form.Input
              name="email"
              required
              type="email"
              validators={["required"]}
              errorMessages={["this field is required"]}
              placeholder="email"
              autoComplete="email"
              value={this.state.email}
            />
            <Form.Input
              name="password"
              type="password"
              required
              validators={["required", "minStringLength:6"]}
              errorMessages={[
                "this field is required",
                "Please enter a minimum of 6 characters"
              ]}
              placeholder="password"
              autoComplete="new-password"
              value={this.state.password}
            />
            <Form.Input
              name="password_confirmation"
              type="password"
              required
              placeholder="password confirmation"
              validators={["required", "minStringLength:6"]}
              errorMessages={[
                "this field is required",
                "Please enter a minimum of 6 characters"
              ]}
              autoComplete="new-password"
              value={this.state.password_confirmation}
            />
            <Form.Input
              name="first_name"
              type="text"
              required
              validators={["required"]}
              errorMessages={["this field is required"]}
              placeholder="First Name"
              autoComplete="name"
              value={this.state.first_name}
            />
            <Form.Input
              name="last_name"
              required
              type="text"
              validators={["required"]}
              errorMessages={["this field is required"]}
              placeholder="Last Name"
              autoComplete="name"
              value={this.state.last_name}
            />
            <Form.TextArea
              name="aboutme"
              type="textarea"
              required
              errorMessages={["this field is required"]}
              placeholder="Tell us more about you "
              autoComplete="text"
              value={this.state.aboutme}
            />
            <div style={{ textAlign: "center" }}>
              <Button
                className="signUpBtn"
                style={{ textAlign: "center" }}
                primary
              >
                Submit
              </Button>
            </div>
          </Form>
          <Button as={Link} to="/login" size="mini">
            Back To Login
          </Button>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
