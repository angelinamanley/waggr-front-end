import React from 'react'
import { Form, Button, Grid, Image} from 'semantic-ui-react'
import API from '../adapters/API'
import {NavLink} from 'react-router-dom'
import logo from './common/waggrlogo.png'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  submit = e => {
    e.preventDefault()
    API.login({ email: this.state.email, password: this.state.password })
    .then(data => {
      console.log(data)
      // if (data.error) {
      //   alert(data.error)
      // } else {
        this.props.login(data)
      // }
  })
  .catch(error => alert(error))
}

  render() {
    return (
      <div className="login">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ paddingTop: "35%"  }}>
          <Image src={logo} size="medium" centered />
        {/* <Header as="h3" color="teal" textAlign="center">
              Log-in to your account
            </Header> */}
      <Form
      size="large"
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
   
        <Form.Input
        style={{ width:"230px" }} 
          name="email"
          type="email"
          placeholder="email"
          icon='user'
          iconPosition='left'
          autoComplete="email"
          value={this.state.email}
        />
        <Form.Input
        style={{ width:"230px" }} 
          name="password"
          type="password"
          icon="lock"
          iconPosition="left"
          placeholder="password"
          autoComplete="password"
          value={this.state.password}
        />
        <Form.Button secondary>Login</Form.Button>
  
      </Form>
     <h5>New to Us? </h5>
     <Button secondary as={NavLink} to="/signup">Sign Up</Button>
   
     </Grid.Column>
        </Grid>
      </div>
     )
  }
}

export default LoginForm