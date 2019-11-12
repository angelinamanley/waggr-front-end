import React from 'react';
import {Card,  Image, Message, Container } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'


export default class UserGroups extends React.Component{

render(){

    if(!this.props.user){
        return <div>Loading..</div>
    } else if (this.props.user.groups.length === 0)
      { return( <Message color="violet" style={{width: '85%', marginRight: "auto", marginLeft: "auto", fontSize: '120%'}}>You haven't joined any groups yet.</Message>) }
    else {
      return(

      
        
          <Container>
            <Card.Group centered>
        {this.props.user.groups.map(group => 
            <Card style={{width:'85%'}}
              key={group.id}
              as={NavLink}
              to={`/groups/${group.id}`}
            >
              <Card.Content>
                <Image floated="left"  size="small" src={group.photo} />
                <Card.Header>{group.name}</Card.Header>
              </Card.Content>
            </Card>
            )   

} </Card.Group> </Container>) 
} }
}