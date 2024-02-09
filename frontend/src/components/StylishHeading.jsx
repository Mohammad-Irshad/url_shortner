import React from "react";
import { Container } from "react-bootstrap";

const StylishHeading = ({ level, children }) => {
  const HeadingTag = `h${level}`;

  return (
    <Container className="text-center mt-5">
      <HeadingTag className="text-primary fw-bold">{children}</HeadingTag>
    </Container>
  );
};

export default StylishHeading;
