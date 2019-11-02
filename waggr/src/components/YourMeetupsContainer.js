import React from 'react';

export default class YourMeetupsContainer extends React.Component{

    state = { 
        selectedGroup: null
    }

    render(){
        return(

            <div>
                 <h3>Your Upcoming Meetups</h3>
                    <ul>{this.props.meetups.map(meetup=> <li>{meetup.name} - {meetup.datetime} </li>)}</ul>
            </div>

        )
    }


}

