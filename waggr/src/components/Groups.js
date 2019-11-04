import React from 'react';
import AllGroupsContainer from "./AllGroupsContainer"
import Spinner from './common/Spinner';




class Groups extends React.Component{ 


    


    render(){
        if (!this.props) {
            return <Spinner />}
            else {
        return(
            <h2><AllGroupsContainer getGroups={this.props.getGroups} handleSearchClick={this.props.handleSearchClick} selectGroup={this.props.selectGroup} groups={this.props.groups} /> </h2>
        )
    }

}
}

export default Groups 