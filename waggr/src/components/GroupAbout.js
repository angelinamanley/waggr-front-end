import React from "react";
import { Container, List, Image } from "semantic-ui-react";
import {Link} from 'react-router-dom'

const GroupAbout = props => {
  return (
    <Container>
       <h4> Group Members </h4>
        <List size='large'>
            {props.group.users.map(user => 
                <List.Item key={user.id} > 
                    <Image avatar src={user.photo} />
                    <List.Content>
                        <List.Header as={Link} to={`/users/${user.id}`}>{user.first_name}</List.Header>
                    </List.Content>
            </List.Item>)}
                </List>
    </Container>
  );
};

export default GroupAbout;
