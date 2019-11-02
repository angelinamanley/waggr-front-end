import React from "react";
import { Card, Image } from "semantic-ui-react";
import {Link} from 'react-router-dom'

const AllGroupsContainer = props => {
  return (
    <div>
      <h2>All Groups</h2>

      {props.groups.map(group => (
        <Card as={Link} to='/group' onClick={()=>props.selectGroup(group)}>
            <Card.Content>
                <Image 
                floated='right'
                seize='mini'
                src={group.photo} />
                <Card.Header>{group.name}</Card.Header>
            </Card.Content>
        </Card>
      ))}
    </div>
  );
};

export default AllGroupsContainer;

{
  /* <Card as={Link} to="/dog" onClick={()=>this.props.selectDog(dog)} >
<Card.Content>
    <Image 
    floated='right'
    size='mini'
    src={dog.photo}
    />
    <Card.Header>{dog.name}</Card.Header>
</Card.Content>
</Card> */
}
