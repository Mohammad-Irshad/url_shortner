import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth-context";
import StylishHeading from "../components/StylishHeading";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const sendLoginCredentials = await fetch("/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const userData = await sendLoginCredentials.json();

      if (sendLoginCredentials.ok) {
        toast.success("Logged in successfully.");
        login(userData);
        navigate("/");
      } else {
        toast.error("Please enter credentials");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div>
        <StylishHeading level={1}>Please login to continue...</StylishHeading>
      </div>
      <Form onSubmit={submitHandler} className="mt-4">
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
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Col>

          <Col>
            <p>
              Don&apos;t have an account?
              <LinkContainer to="/signup">
                <a> Sign Up</a>
              </LinkContainer>
            </p>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default LoginScreen;
