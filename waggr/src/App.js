import React from 'react';
import API from './adapters/API';
import {Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import { Container, Message } from 'semantic-ui-react'
import { routes } from './config/routes'


const notFoundMessage = () => <Message negative>NOT FOUND</Message>


class App extends React.Component{

  state = {
    user: null
  }

  componentDidMount() {
    API.validateUser().then(user => {
      if (user.errors) {
        alert(user.errors)
        this.props.history.push('/login')
      } else {
        this.setState({ user }, ()=>this.props.history.push('/home'))
      }
    })
  }

  login = user => {
    this.setState({ user }, () => this.props.history.push('/home'))
  }

  logout = () => {
    API.logout()
    this.setState({ user: null })
    this.props.history.push('/login')
  }


  render(){
    return(
      
      <div>
        <NavBar routes={routes} user={this.state.user}/>
        <Container>
          {routes.map(route => (
            <Route
              key={route.path}
              exact
              path={route.path}
              component={routerProps =>
                route.component ? (
                  <route.component
                    {...routerProps}
                    login={this.login}
                    logout={this.logout}
                  />
                ) : (
                  notFoundMessage()
                )
              }
            />
          ))}
        </Container>
         
      </div>





    )
  }



  }



export default App;
