import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import "./Auth.css";

function SignupPage() {
  const [body, setBody] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    updateBody(name, value);
  }

  function handleSubmitSignup(event) {
    event.preventDefault();
    services
      .signup(body)
      .then(() => navigate("/"))
      .catch(() => alert("Une erreur a eu lieu pendant l'inscription"));
  }

  return (
    <Container className="signup">
      <Row className="justify-content-center m-3">
        <Col className="text-center " md="auto">
          <Form onSubmit={handleSubmitSignup} onChange={handleFormChange} >
              <Form.Group className="mb-3" controlId="email">
              <Form.Label>email</Form.Label>
              <Form.Control type="email" placeholder="test@test.com" name="email" required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control type="password" placeholder="password" name="password" required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>confirmPassword</Form.Label>
              <Form.Control type="password" placeholder="confirmPassword" name="confirmPassword" required/>
              </Form.Group>

              <Button variant="primary" type="submit">S'inscrire</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
