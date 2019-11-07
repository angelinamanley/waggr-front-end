import React from 'react';
import {Card,  Image } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'


export default class UserGroups extends React.Component{

render(){

    if(!this.props.user){
        return <div>Loading..</div>
    } else {
    return(
        <div>
            <Card.Group centered>
        {this.props.user.groups.map(group => 
            <Card
              key={group.id}
              as={NavLink}
              to={`/groups/${group.id}`}
            >
              <Card.Content>
                <Image floated="right"  src={group.photo} />
                <Card.Header>{group.name}</Card.Header>
              </Card.Content>
            </Card>
    
)   

} </Card.Group></div>)
} }
}