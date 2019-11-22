import React from 'react';
import AllGroupsContainer from "./AllGroupsContainer"
import Spinner from './common/Spinner';
import AllMeetupsContainer from './AllMeetupsContainer'
import AllMeetupGroupMenu from './AllMeetupGroupMenu'


class Groups extends React.Component{ 

    state = { menuSelect : "Search Groups"}

    handleMenuSelect = menuItem => {
        this.setState({ menuSelect: menuItem });
      };

    render(){
        if (!this.props) {
            return <Spinner />}
            else {
        return(
            
            <div>
            <AllMeetupGroupMenu handleMenuSelect={this.handleMenuSelect} />
            { this.state.menuSelect === "Search Meetups"?
            <AllMeetupsContainer />
            : <AllGroupsContainer getGroups={this.props.getGroups} handleSearchClick={this.props.handleSearchClick} selectGroup={this.props.selectGroup} groups={this.props.groups} />
        }
          
            </div>
            )
    }

}
}

export default Groups 