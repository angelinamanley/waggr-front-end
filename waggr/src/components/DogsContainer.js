import React from 'react';
import {Card, Image, Container } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

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
              

            {this.props.dogs.map(dog=> 
                <Card key={dog.id} as={Link} to={`/dogs/${dog.id}`} >
                    
                   
                    <Card.Content>
                    <Image circular
                        floated='left'
                        size='tiny'
                        src={dog.photo}
                        />
                        <Card.Header >{dog.name}</Card.Header>
                    </Card.Content>
            </Card> )}


            </Card.Group>
            </Container>

            ) 
            }      }   
}

export default DogsContainer
