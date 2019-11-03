import React from "react";
import { Card, Image } from "semantic-ui-react";
import {Link} from 'react-router-dom'

const AllGroupsContainer = props => {
    
    if (!props.groups) {
    return <div>loading...</div> }
    else {
    
  return (
    <div>
      <h2>All Groups</h2>

      {props.groups.map(group => (
        <Card key={group.id} as={Link} to='/group' onClick={()=>props.selectGroup(group)}>
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
  );}
};

export default AllGroupsContainer;
