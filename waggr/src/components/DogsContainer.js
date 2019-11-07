import React from 'react';
import {Card, Image, Button, Container } from 'semantic-ui-react'
import {Link, NavLink} from 'react-router-dom'

class DogsContainer extends React.Component{


    render(){

        return(

            <div>
                <Container>
                <h3>Your Dogs</h3>
            
            <Card.Group>

            {this.props.dogs.map(dog=> 
                <Card as={Link} to={`/dogs/${dog.id}`} >
                    <Card.Content>
                        <Image 
                        floated='right'
                        size='mini'
                        src={dog.photo}
                        />
                        <Card.Header>{dog.name}</Card.Header>
                    </Card.Content>
            </Card> )}


            </Card.Group>
            <Button primary as={NavLink} to='/add_dog' >Add Dog </Button>
            </Container>
            </div>

        )

    }
}

export default DogsContainer
