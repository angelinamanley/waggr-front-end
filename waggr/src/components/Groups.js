import React from 'react';
import API from "../adapters/API";
import AllGroupsContainer from "./AllGroupsContainer"


class Groups extends React.Component{ 


    


    render(){
        if (!this.props) {
            return <h1>LOADING</h1>}
            else {
        return(
            <h2><AllGroupsContainer getGroups={this.props.getGroups} selectGroup={this.props.selectGroup} groups={this.props.groups} /> </h2>
        )
    }

}
}

export default Groups 