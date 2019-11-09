import React from "react";
import API from "./adapters/API";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import LogInForm from "./components/LogInForm";
import Dashboard from "./components/Dashboard";
import Groups from "./components/Groups";
import Map from "./components/Map";
import NavBar from "./components/NavBar";
import DogShowPage from "./components/DogShowPage"
import AddDogForm from "./components/AddDogForm"
import GroupShowPage from "./components/GroupShowPage.js"
import SignUpForm from "./components/SignUpForm"
import MeetupForm from "./components/MeetupForm"
import MeetupShowPage from "./components/MeetupShowPage";
import AddGroupForm from "./components/AddGroupForm";
import EditGroupForm from "./components/EditGroupForm";
import UserShowPage from "./components/UserShowPage";
import EditDogForm from "./components/EditDogForm";
import EditMeetupForm from './components/EditMeetupForm'

class App extends React.Component {
  state = {
    user: null, 
    searchTerm: null, 
   };

  setUserLocation = (userLocation, userLatitude, userLongitutde) => {
    this.setState({ user: {...this.state.user, location: userLocation, latitude: userLatitude, longitude: userLongitutde }})
  }

  addDogtoUser = (dog) => {
    this.setState({user: {...this.state.user, dogs: [...this.state.user.dogs, dog]}})
  }

  componentDidMount() {
    API.validateUser().then(user => {
      if (user.errors) { this.props.history.push("/login");
      } else {
      this.setState({ user })
      }
    })
  }

  login = user => {
    this.setState({ user }, () => this.props.history.push("/home"));
  };

  logout = () => {
    API.logout();
    this.setState({ user: null }, () => this.props.history.push("/login"));
  };

  editProfilePicture = (id, data) => {
    API.editProfilePicture(id, data).then(newUser => this.setState({ user: newUser}))  
  }

  removeDog = (id) => {
    let newDogs = this.state.user.dogs.filter(dog => dog.id !== id )
    this.setState({ user: {...this.state.user, dogs: newDogs }})
  }

  render() {
    return (
      <div>
        { this.state.user? <NavBar logout={this.logout} user={this.user} /> : null}
        <Route exact path="/login" component={routerProps => <LogInForm login={this.login} {...routerProps} /> }/>
        <Route exact path="/home" component={routerProps =>  <Home user={this.state.user}  selectGroup={this.selectGroup} userSelectGroup={this.userSelectGroup} {...routerProps} />} />
        <Route exact path="/dashboard" component={routerProps=> <Dashboard editProfilePicture={this.editProfilePicture} logout={this.logout}  user={this.state.user} {...routerProps} /> }/>
        <Route exact path="/map" component={routerProps=> <Map  setUserLocation={this.setUserLocation} user={this.state.user}  {...routerProps} /> }/>
        <Route exact path="/groups" component={routerProps=> <Groups  {...routerProps} /> } />
        <Route exact path="/dogs/:id" component={routerProps=> <DogShowPage   {...routerProps}  />} />
        <Route exact path="/add_dog"  component={routerProps=> <AddDogForm  user={this.state.user} addDogtoUser={this.addDogtoUser} refreshUser={this.refreshUser} {...routerProps}  />} />
        <Route exact path="/groups/:id" component={routerProps => <GroupShowPage user={this.state.user} groups={this.state.groups} {...routerProps}/>} />
        <Route exact path="/signup" component={routerProps => <SignUpForm login={this.login} {...routerProps} /> } />
        <Route exact path="/groups/:id/createmeetup"component={routerProps => <MeetupForm user={this.state.user} group={this.state.selectedGroup} getGroups={this.getGroups} {...routerProps}/>} />
        <Route exact path="/meetups/:id" component={routerProps => <MeetupShowPage selectUser={this.selectUser} user={this.state.user} addAttendance={this.addAttendance} removeAttendance={this.removeAttendance} meetup={this.state.selectedMeetup} {...routerProps} />}/>
        <Route exact path="/meetups/:id/edit" component={routerProps => <EditMeetupForm user={this.state.user} addAttendance={this.addAttendance} removeAttendance={this.removeAttendance} meetup={this.state.selectedMeetup} {...routerProps} />}/>
        
        <Route exact path='/addgroup' component={routerProps => <AddGroupForm user={this.state.user} addGrouptoGroups={this.addGrouptoGroups} {...routerProps} /> }/>
        <Route exact path='/groups/:id/edit' component={routerProps => <EditGroupForm user={this.state.user} editGroupinGroups={this.editGroupinGroups} group={this.state.selectedGroup} {...routerProps} /> }/>
        <Route exact path='/users/:id' component={routerProps => <UserShowPage selectDog={this.selectDog} selectedUser={this.state.selectedUser} {...routerProps} />} />
        <Route exact path='/dogs/:id/edit' component={routerProps => <EditDogForm removeDog={this.removeDog} {...routerProps} />}/>
      </div>

      //
    );
  }
}

export default App;
