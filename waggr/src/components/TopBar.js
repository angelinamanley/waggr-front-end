import React from 'react';
import { Container, Image, Divider} from 'semantic-ui-react'
import Logo from './common/icon.png'
const TopBar = props => {
  return (
    <div> 
    <Container
      style={{ paddingTop: "5px" }}
      fixed="top"
      textAlign="center"
    >
      <div
        style={{
          fontSize: "200%",
          fontWeight: "bold",
          color: "#14B89C",
          paddingTop: "2px",
          paddingBottom: "0px"
        }}
        textAlign="center"
      >
        {" "}
        <Image style={{ maxWidth: "15%" }} verticalAlign="middle" src={Logo} />
        {props.text}
      </div>
    </Container>
    <Divider />
    </div>
  );
};

export default TopBar