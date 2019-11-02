import React from 'react';
import {Card, Image, Button } from 'semantic-ui-react'
import {Link, NavLink} from 'react-router-dom'

class DogsContainer extends React.Component{


    render(){

        return(

            <div>
                <h3>Your Dogs</h3>

            <Card.Group>

            {this.props.dogs.map(dog=> 
                <Card as={Link} to="/dog" onClick={()=>this.props.selectDog(dog)} >
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
            <Button as={NavLink} to='/add_dog' >Add Dog </Button>
            </div>

        )

    }
}

export default DogsContainer
