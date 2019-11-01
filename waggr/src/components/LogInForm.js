import React from 'react'
import { Form } from 'semantic-ui-react'
import API from '../adapters/API'

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
    API.login({ email: this.state.email, password: this.state.password }).then(
      user => this.props.login(user)
    )
  }

  render() {
    return (
      <Form
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
        <Form.Input
          name="email"
          type="email"
          placeholder="email"
          autoComplete="email"
          value={this.state.email}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="password"
          autoComplete="password"
          value={this.state.password}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
      
    )
  }
}

export default LoginForm