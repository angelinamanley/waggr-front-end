import React from 'react';
import { Button} from 'semantic-ui-react'


const GroupShowPage = props => {


    return(
        <div> <h2>{props.group.name} </h2> 

        <h3>{props.group.description} </h3>

        </div>

        <Button  >Join us!</Button>



    )





}

export default GroupShowPage