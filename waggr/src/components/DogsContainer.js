import React from 'react';
import {Card, Image, Button, Container } from 'semantic-ui-react'
import {Link, NavLink} from 'react-router-dom'

class DogsContainer extends React.Component{


    render(){

        if (this.props.dogs.length === 0)
            { return(
                            
            
                <Container>
            < Card> 
            <Card.Content>
            <Card.Header>
            No dogs...yet! 
                </Card.Header></Card.Content></Card>
                </Container> )
        } else { return(
                <Container>
                    <Card.Group centered>
                <h3>Your Dogs</h3>

            {this.props.dogs.map(dog=> 
                <Card key={dog.id} as={Link} to={`/dogs/${dog.id}`} >
                    <Card.Content>
                        <Image circular
                        floated='left'
                        size='small'
                        src={dog.photo}
                        />
                        <Card.Header>{dog.name}</Card.Header>
                    </Card.Content>
            </Card> )}


            </Card.Group>
            </Container>

            ) 
            }      }   
}

export default DogsContainer
