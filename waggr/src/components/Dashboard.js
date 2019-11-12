import React from 'react';
import DogsContainer from './DogsContainer'
import { Button, Image} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import AccountSettings from './AccountSettings'
import AddDogButton from './AddDogButton'
import Spinner from './common/Spinner';
import TopBar from './TopBar'
import AccountSettingsList from './AccountSettingsList';

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
                return <Spinner />}
                else{

            return( 
                <div >

                    <TopBar text={"Dashboard"} />
                    <div id="dashboard" style={{ marginRight: '2em', marginLeft: '2em'}}>
                    <Image src={this.props.user.photo} centered circular size='small'  />

                    <div style={{ textAlign: 'center'}}><h1>{this.props.user.first_name}</h1>
                    </div>
                    <h3>Your Dogs</h3>
                    <DogsContainer dogs={this.props.user.dogs} />
                    <AccountSettingsList logout={this.props.logout} showWidget={this.showWidget} />
                    </div>
                    </div>

                    
                    

                   
                    
                    
                

                    
            )
        }
    }





}

export default Dashboard 