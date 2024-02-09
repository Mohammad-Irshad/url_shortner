import { Form, Button, Row, Col, Alert } from "react-bootstrap";

import UrlList from "../components/UrlList";
import { useAuth } from "../context/auth-context";
import { useState } from "react";
import { toast } from "react-toastify";
import StylishHeading from "../components/StylishHeading";
import Loader from "../components/Loader";

function HomeScreen() {
  const [longUrl, setLongUrl] = useState("");
  const [description, setDescription] = useState("");
  const [newUrl, setNewUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const urlHandler = (e) => {
    setLongUrl(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const sendUrlData = await fetch("/api/urls/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl, description }),
      });
      if (sendUrlData.ok) {
        const addedUrl = await sendUrlData.json();
        setNewUrl(addedUrl);
        toast.success("Short URL generated.");
      } else {
        toast.error("Something went wrong, fill all the details.");
      }
      // console.log(addedUrl);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    setIsLoading(false);
    setLongUrl("");
    setDescription("");
  };

  return (
    <>
      <div>
        <StylishHeading level={2}>Hello! {user.name}</StylishHeading>
      </div>
      <Form className="mt-2" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            onChange={urlHandler}
            value={longUrl}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            onChange={descriptionHandler}
            value={description}
          />
        </Form.Group>

        <Row lg>
          <Col>
            <Button variant="primary" type="submit">
              Generate
            </Button>
          </Col>

          <Col>
            {newUrl && (
              <Alert variant="success">
                URL Generated:{" "}
                <a target="_blank" href={newUrl.longUrl} rel="noreferrer">
                  {newUrl.shortUrl}
                </a>
              </Alert>
            )}
          </Col>
        </Row>
      </Form>
      <div>
        <StylishHeading level={3}>Your URLs</StylishHeading>
      </div>
      {isLoading ? <Loader /> : <UrlList newUrl={newUrl} />}
    </>
  );
}

export default HomeScreen;
