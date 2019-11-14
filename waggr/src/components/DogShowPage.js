import React from "react";
import { Image, Container, Grid, Button, Icon} from "semantic-ui-react";
import API from '../adapters/API'
import {Link} from 'react-router-dom'
import TopBar from './TopBar.js'
import moment from 'moment'
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
    let ageNum = moment().diff(dog.birthday, 'years')
    let ageText 
    moment().diff(dog.birthday, 'years') > 1?  ageText = " years old" :  ageText = " year old"
    


    return (
      <div>
          <TopBar text={dog.name} />
        <div id="addgroupform" style={{ marginRight: '2em', marginLeft: '2em'}}>
          
        <Grid centered columns={1}>
            <Grid.Column>
      <Container>
        <Image src={dog.photo} size="small" centered circular />
        <h2>{dog.name}{dog.gender === 'Female'? <Icon name='venus'/> : <Icon name='mars' /> }</h2>
        <ul> 
          <li>{dog.breed}</li>
          <li>{ageNum}{ageText}</li>
          <li>{dog.bio}</li>
        </ul>
        <Button as={Link} size="tiny" to={`/dogs/${dog.id}/edit`} primary >Edit Dog</Button>
      </Container>
      </Grid.Column>
      </Grid>
      </div>
      </div>
    );
  }}
};

export default DogShowPage;
