import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="footer bg-dark"
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <Container className="text-center py-3">
        <span className="text-light">
          URL Shortener &copy; 2024 Mohammad Irshad
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
