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




class App extends React.Component {
  state = {
    user: null, 
    groups: null, 
    selectedDog: null, 
    selectedGroup: null,
    searchTerm: null, 
    meetups : null, 
    selectedMeetup : null 
  };

  getGroups = () => API.getGroups().then(groups => this.setState( { ...this.state, validating: true, groups: groups }))

    addPostToGroup = (post) => {
     let newPosts = []
     console.log(this.state.selectedGroup.posts)
     newPosts = [...this.state.selectedGroup.posts, post]
    //  console.log({selectedGroup: {...this.state.selectedGroup, posts: newposts}})
    
    this.setState({selectedGroup: {...this.state.selectedGroup, posts: newPosts}})
  }

    filterGroups = () => {
      if (this.state.searchTerm != null) {
    return this.state.groups.filter(group =>
      group.name
        .toLocaleLowerCase()
        .includes(this.state.searchTerm.toLocaleLowerCase())
    )} else {
    return this.state.groups} }

  handleSearchClick = value => {
    this.setState({ searchTerm: value });
  }

  componentDidMount() {
    API.validateUser().then(user => {
      if (user.errors) {
        this.props.history.push("/login");
      } else {
        // this.setState({ user }, () => this.props.history.push("/home"));
        this.setState({ user })
      }
    })
    this.getGroups();
    API.getMeetups().then(meetups => this.setState({ meetups }));
  }

  selectDog = (dog) => { 
    this.setState({ selectedDog : dog })
  }

  selectGroup = (group) => {
    this.setState({ selectedGroup : group })
  }
  
  userSelectGroup = (groupId) => {
    let selectGroup = this.state.groups.find(group => group.id === groupId)
    this.setState({ selectedGroup : selectGroup })
  }

  userSelectMeetup = (meetupId) => {
    let selectMeetup = this.state.meetups.find(meetup => meetup.id === meetupId)
    this.setState({ selectedMeetup : selectMeetup })
  }

  login = user => {
    this.setState({ user }, () => this.props.history.push("/home"));
  };

  refreshUser = user => this.setState({user})

  logout = () => {
    API.logout();
    this.setState({ user: null }, () => this.props.history.push("/login"));
  };

  render() {
    const filteredGroups = this.filterGroups()
    return (
      <div>
        { this.state.user? <NavBar logout={this.logout} user={this.user} /> : null}
        

          <Route exact path="/login" component={routerProps => <LogInForm login={this.login} {...routerProps} /> }/>
          <Route exact path="/home" component={routerProps => (
              <Home
                user={this.state.user} userSelectMeetup={this.userSelectMeetup} selectGroup={this.selectGroup} userSelectGroup={this.userSelectGroup}
                {...routerProps}
              />
            )}
          />
          
        <Route exact path="/dashboard" component={routerProps=> <Dashboard logout={this.logout} selectDog={this.selectDog} user={this.state.user} {...routerProps} /> }/>
        <Route exact path="/map" component={routerProps=> <Map  user={this.state.user} meetups={this.state.meetups} {...routerProps} /> }/>
        <Route exact path="/groups" component={routerProps=> <Groups handleSearchClick={this.handleSearchClick} selectGroup={this.selectGroup}  groups={filteredGroups} {...routerProps} /> } />
        <Route exact path="/dog" component={routerProps=> <DogShowPage  dog={this.state.selectedDog}  {...routerProps}  />} />
        <Route exact path="/add_dog"  component={routerProps=> <AddDogForm  user={this.state.user} refreshUser={this.refreshUser} {...routerProps}  />} />
        <Route exact path="/group" component={routerProps => <GroupShowPage addPostToGroup={this.addPostToGroup}user={this.state.user} group={this.state.selectedGroup} groups={this.state.groups} {...routerProps}/>} />
        <Route exact path="/signup" component={routerProps => <SignUpForm login={this.login} {...routerProps} /> } />
        <Route exact path="/createmeetup"component={routerProps => <MeetupForm user={this.state.user} group={this.state.selectedGroup} getGroups={this.getGroups} {...routerProps}/>} />
        <Route exact path="/meetup" component={routerProps => <MeetupShowPage user={this.state.user} meetup={this.state.selectedMeetup} {...routerProps} />}/>
      </div>

      //
    );
  }
}

export default App;
