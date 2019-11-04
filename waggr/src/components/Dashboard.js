import React from 'react';
import DogsContainer from './DogsContainer'
import YourMeetupsContainer from './YourMeetupsContainer'
import { Button} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
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

 

        render(){ 
            if (!this.props.user) {
                return <div> Loading Info</div>}
                else{

            return( 
                <div>
                    <h1>{this.props.user.first_name} <Button as={NavLink} exact to="/login" onClick={()=> this.props.logout()} secondary size='mini'>Log Out </Button> </h1>
                    <DogsContainer selectDog={this.props.selectDog} dogs={this.props.user.dogs} />
                    <YourMeetupsContainer meetups={this.props.user.meetups} />

                    
                    

                   
                    
                    
                

                    
                </div>
            )
        }
    }





}

export default Dashboard 