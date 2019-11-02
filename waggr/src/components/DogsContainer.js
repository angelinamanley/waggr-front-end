import React from 'react';

export default class DogsContainer extends React.Component{

    state = {
        selectedDog : null
    }

    render(){

        return(

            <div>
                <h3>Your Dogs</h3>
                    <ul>{this.props.dogs.map(dog=> <li>{dog.name}</li>)}</ul>
            </div>

        )

    }
}
