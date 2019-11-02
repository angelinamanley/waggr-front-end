import React from 'react';
import GroupInfo from './GroupInfo'
import GroupForum from './GroupForum'

const GroupShowPage = props => { 


    return( 
        <div>
        <GroupInfo user={props.user} group={props.group}/> 
        <GroupForum />
        </div>

    )


}


export default GroupShowPage 