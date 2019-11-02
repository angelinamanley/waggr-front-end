import React from 'react';
import API from "../adapters/API";
import AllGroupsContainer from "./AllGroupsContainer"


class Groups extends React.Component{ 

    state = { 

        groups: null, 
        validating: false 
    }

    componentDidMount(){
    API.getGroups().then(groups => this.setState( { ...this.state, validating: true, groups: groups }))
    } 

    render(){
        if (!this.state.validating) {
            return <h1>LOADING</h1>}
            else {
        return(
            <h2><AllGroupsContainer selectGroup={this.props.selectGroup} groups={this.state.groups} /> </h2>
        )
    }

}
}

export default Groups 