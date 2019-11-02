import React from 'react';
import { Button } from 'semantic-ui-react'
import DogsContainer from './DogsContainer'
import YourMeetupsContainer from './YourMeetupsContainer'
//user profile pic, user dogs, user groups, user upcoming meetups 


class Dashboard extends React.Component{ 

    state = {
        validating : true 
    }


        componentDidMount() {
            this.setState({
                validating: false 
                })
        }

        // componentDidUpdate(){
        //     this.setState({
        //     validating: false 
        //     })
        // }

        render(){ 
            if (!this.props.user) {
                return <div> Loading Info</div>}
                else{

            return( 
                <div>
                    <h1>{this.props.user.first_name}</h1>
                    <DogsContainer selectDog={this.props.selectDog} dogs={this.props.user.dogs} />
                    <YourMeetupsContainer meetups={this.props.user.meetups} />

                    
                    

                   
                    
                    
                

                    
                </div>
            )
        }
    }





}

export default Dashboard 