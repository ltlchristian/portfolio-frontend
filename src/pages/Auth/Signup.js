import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";

function SignupPage() {
  const [body, setBody] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function updateBody(key, value) {
    // Il faut toujours faire une copie du state qu'on veut modifier si c'est un objet
    // objet = {  } ou [ ]
    setBody({ ...body, [key]: value });
  }

  function handleFormChange(event) {
    const name = event.target.name; // email
    const value = event.target.value; // toto@toto.com
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
    <div>
      <h1>Inscription</h1>
      <Container>
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
      </Container>
    </div>
  );
}

export default SignupPage;
