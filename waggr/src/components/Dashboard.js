import React from 'react';
import DogsContainer from './DogsContainer'
import { Button, Image} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import AccountSettings from './AccountSettings'
//user profile pic, user dogs, user groups, user upcoming meetups 


class Dashboard extends React.Component{ 

    state = {
        validating : true, 
        photo: null
    }

       


        componentDidMount() {
            this.setState({
                validating: false 
                })
        }

        showWidget = () => {
            this.widget.open()
          }
      
           widget = window.cloudinary.createUploadWidget({ 
            cloudName: "angelinashin", uploadPreset: "zdjpntym" , cropping: true, croppingAspectRatio : 1, showSkipCropButton: false}, (error, result) => { this.checkUploadResult(result) });
      
      
          checkUploadResult = (resultEvent) => {
            if (resultEvent.event === 'success') {
              console.log(resultEvent.info.secure_url) 
              this.props.editProfilePicture(this.props.user.id, resultEvent.info.secure_url)
            }
          }

        render(){ 
            if (!this.props.user) {
                return <div> Loading Info</div>}
                else{

            return( 
                <React.Fragment>
                    <Image src={this.props.user.photo} centered circular size='small'  />

                    <h1>{this.props.user.first_name} <Button as={NavLink} exact to="/login" onClick={()=> this.props.logout()} secondary size='mini'>Log Out </Button> </h1>
                    <DogsContainer dogs={this.props.user.dogs} />
                    <AccountSettings />
                    <Button secondary onClick={this.showWidget}>Edit Profile Picture</Button>
                    </React.Fragment>

                    
                    

                   
                    
                    
                

                    
            )
        }
    }





}

export default Dashboard 