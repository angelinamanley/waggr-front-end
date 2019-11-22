import React from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

const AddDogButton = props => {


    return(       
        
        <Button primary as={Link} to='/add_dog' >Add Dog </Button>

    )

}

export default AddDogButton