import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import services from "../../services";
import "./Auth.css";

function LoginPage() {
  const { setConnected } = useAuth();
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    updateBody(name, value);
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    services
      .login(body)
      .then((result) => {
        const { jwt } = result;
        localStorage.setItem("jwt", jwt);
        setConnected(true);
        navigate("/project");
      })
      .catch((err) => {
        console.log(err);
        alert("Une erreur a eu lieu pendant le login");
      });
  }

  return (
    <Container className="login">
      <Row className="justify-content-center m-3">
        <Col className="text-center " md="auto">
          <Form onSubmit={handleSubmitLogin} onChange={handleChangeInput} >
              <Form.Group className="mb-3" controlId="email">
              <Form.Label>email</Form.Label>
              <Form.Control type="email" placeholder="test@test.com" name="email" required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control type="password" placeholder="password" name="password" required/>
              </Form.Group>

              <Button variant="primary" type="submit">Se connecter</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
