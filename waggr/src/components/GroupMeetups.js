import React from 'react';
import {Button} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class GroupMeetups extends React.Component{

    render(){
        
        return(


            <Button primary as={NavLink} to="/createmeetup">
            Add a new event
          </Button>
        )
    }

    
}