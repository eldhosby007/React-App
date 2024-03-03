import React from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";

const About = () => {
  return (
    <div style={{ marginTop: "100px" }}>
    <MDBContainer>
      <MDBTypography note noteColor="primary">
        This is a blogging site which contains posts related to Travel, Fitness,
        Food, Fashion etc..
      </MDBTypography>
    </MDBContainer>
    </div>
  );
};

export default About;
