import React from 'react';
import GroupInfo from './GroupInfo'
import GroupForum from './GroupForum'
import {Button} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'


const GroupShowPage = props => { 


    return( 
        <div>
        <GroupInfo user={props.user} group={props.group}/> 
        <Button  primary as={NavLink} to='/createmeetup'>Add a new event</Button>
        <GroupForum user={props.user} group={props.group}/>
       
        </div>

    )


}


export default GroupShowPage 