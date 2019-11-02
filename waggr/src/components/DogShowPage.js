import React from 'react';

const DogShowPage = props => {

    if (!props.dog) {
        return <div> Loading Info</div>}
        else{

    return( 
        <div>
                <h2>{props.dog.name}</h2>
                <li>{props.dog.gender}</li>
                <ul>
                <li>{props.dog.breed}</li>
                <li>{props.dog.birthday}</li>
                <li>{props.dog.bio}</li>
               
                </ul>
        

        </div>
      
    )

        }












}


export default DogShowPage 



