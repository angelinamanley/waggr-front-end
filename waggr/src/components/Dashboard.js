import React from 'react';
import DogsContainer from './DogsContainer'
import { Button, Image} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import AccountSettings from './AccountSettings'
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
                    <Image src={this.props.user.photo} centered size='small'/>

                    <h1>{this.props.user.first_name} <Button as={NavLink} exact to="/login" onClick={()=> this.props.logout()} secondary size='mini'>Log Out </Button> </h1>
                    <DogsContainer selectDog={this.props.selectDog} dogs={this.props.user.dogs} />
                    <AccountSettings />


                    
                    

                   
                    
                    
                

                    
                </div>
            )
        }
    }





}

export default Dashboard 