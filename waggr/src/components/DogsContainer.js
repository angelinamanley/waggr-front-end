import React from 'react';
import {Card, Image } from 'semantic-ui-react'

class DogsContainer extends React.Component{


    render(){

        return(

            <div>
                <h3>Your Dogs</h3>

            <Card.Group>

            {this.props.dogs.map(dog=> 
                <Card onClick={()=>this.props.selectDog(dog)} >
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
            </div>

        )

    }
}

export default DogsContainer
