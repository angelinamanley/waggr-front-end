import React from 'react';
import {Card, Image, Segment, Container} from 'semantic-ui-react'
import DogsContainer from './DogsContainer'

const UserShowPage = props => {


    if (!props.selectedUser) {
       return <h3>Loading</h3>
    } else {

    return(

       <div>
        <Image src={props.selectedUser.photo} circular />
  
        <DogsContainer selectDog={props.selectDog} dogs={props.selectedUser.dogs} />

        </div>
    
        
    )

    }
}

export default UserShowPage