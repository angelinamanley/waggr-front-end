import React from 'react';

const AllGroupsContainer = (props) => {



    return(
        <div>
            <h2>All groups</h2>

            <ul>
                {props.groups.map(group => 
                <li>{group.name} - 
                    {group.description}
                </li>)}
            </ul>

        </div>


    )

}

export default AllGroupsContainer