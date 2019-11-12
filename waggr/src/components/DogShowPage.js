import React from "react";
import { Image, Container, Grid, Button, Icon} from "semantic-ui-react";
import API from '../adapters/API'
import {Link} from 'react-router-dom'
import TopBar from './TopBar.js'

class DogShowPage extends React.Component {

  state = { 
    dog: null
  }

  componentDidMount(){ 
    API.getDog(this.props.match.params.id).then(dog => this.setState({ dog }))
  }


  render(){
  if (!this.state.dog) {
    return <div> Loading Info</div>;
  } else {
    const { dog} = this.state
    return (
      <div>
          <TopBar text={dog.name} />
        <div id="addgroupform" style={{ marginRight: '2em', marginLeft: '2em'}}>
          <Container></Container>
        <Grid centered columns={1}>
            <Grid.Column>
      <Container>
        <Image src={dog.photo} size="medium" circular />
        <h2>{dog.name}{dog.gender === 'Female'? <Icon name='venus'/> : <Icon name='mars' /> }</h2>
        <ul> 
          <li>{dog.breed}</li>
          <li>{dog.birthday}</li>
          <li>{dog.bio}</li>
        </ul>
        <Button as={Link} to={`/dogs/${dog.id}/edit`} primary >Edit Dog</Button>
      </Container>
      </Grid.Column>
      </Grid>
      </div>
      </div>
    );
  }}
};

export default DogShowPage;
