import React from "react";
import API from "./adapters/API";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Message } from "semantic-ui-react";
import { routes } from "./config/routes";
import Home from "./components/Home";
import LogInForm from "./components/LogInForm";
import { PrivateRoute } from "./helpers/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Groups from "./components/Groups";
import Explore from "./components/Explore";
import Map from "./components/Map";
import NavBar from "./components/NavBar";


class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    API.validateUser().then(user => {
      if (user.errors) {
        this.props.history.push("/login");
      } else {
        this.setState({ user }, () => this.props.history.push("/home"));
      }
    });
  }

  login = user => {
    this.setState({ user }, () => this.props.history.push("/home"));
  };

  logout = () => {
    API.logout();
    this.setState({ user: null }, () => this.props.history.push("/login"));
  };

  render() {
    return (
      <div>
        { this.state.user? <NavBar logout={this.logout} user={this.user} /> : null}


          <Route
            exact
            path="/login"
            component={routerProps => (
              <LogInForm login={this.login} {...routerProps} />
            )}
          />
          <Route
            exact
            path="/home"
            component={routerProps => (
              <Home
                user={this.state.user}
                {...routerProps}
              />
            )}
          />
          
        <Route exact path="/dashboard" component={routerProps=> <Dashboard user={this.state.user} {...routerProps} /> }/>
        <Route exact path="/map" component={routerProps=> <Map  user={this.state.user} {...routerProps} /> }/>
        <Route exact path="/groups" component={routerProps=> <Groups {...routerProps} /> } />
      </div>

      //
    );
  }
}

export default App;
