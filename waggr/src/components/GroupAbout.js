import React from "react";
import { Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const GroupAbout = props => {
  return (
    <Button primary as={NavLink} to="/createmeetup">
      Add a new event
    </Button>
  );
};

export default GroupAbout;
