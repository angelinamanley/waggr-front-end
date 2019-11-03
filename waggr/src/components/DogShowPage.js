import React from "react";
import { Image, Container, Grid } from "semantic-ui-react";

const DogShowPage = props => {
  if (!props.dog) {
    return <div> Loading Info</div>;
  } else {
    return (
        <Grid centered columns={1}>
            <Grid.Column>
      <Container>
        <Image src={props.dog.photo} size="medium" circular />
        <h2>{props.dog.name}</h2>
        <ul> 
        <li>{props.dog.gender}</li>
          <li>{props.dog.breed}</li>
          <li>{props.dog.birthday}</li>
          <li>{props.dog.bio}</li>
        </ul>
      </Container>
      </Grid.Column>
      </Grid>
    );
  }
};

export default DogShowPage;
