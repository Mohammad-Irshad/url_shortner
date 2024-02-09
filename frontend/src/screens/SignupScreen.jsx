import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth-context";
import StylishHeading from "../components/StylishHeading";

function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const signupRequest = await fetch("/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const userData = await signupRequest.json();
      console.log(userData);

      if (signupRequest.ok) {
        toast.success("Account created successfully.");
        login(userData);
        navigate("/");
      } else {
        toast.error("Please enter all the credentials.");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div>
        <StylishHeading level={1}>Create an account</StylishHeading>
      </div>
      <Form onSubmit={submitHandler} className="mt-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={nameHandler}
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={emailHandler}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
            value={password}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={confirmPasswordHandler}
            value={confirmPassword}
          />
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Col>

          <Col>
            <p>
              Already a user?
              <LinkContainer to="/login">
                <a> Login</a>
              </LinkContainer>
            </p>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default SignupScreen;
