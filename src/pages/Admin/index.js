import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import "./Admin.css";

function Admin() {
  const [body, setBody] = useState({
    label: "",
  });
  const navigate = useNavigate();

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }
  
  function handleFormChangeTechnos(event) {
    const name = event.target.name;
    const value = event.target.value;
    updateBody(name, value);
  }

  function handleSubmitTechnos(event) {
    event.preventDefault();
    services
      .createTechno(body)
      .then(() => navigate("/"))
      .catch(() => alert("Une erreur a eu lieu pendant la création d'une techno"));
  }
  
  return (
    <div>
      <h1>Admin</h1>
      <Container>
        <h2>Technos</h2>
        <Form onSubmit={handleSubmitTechnos} onChange={handleFormChangeTechnos} >
            <Form.Group className="mb-3" controlId="label">
              <Form.Label>label</Form.Label>
              <Form.Control type="text" placeholder="libellé techno" name="label" required/>
            </Form.Group>
            <Button variant="primary" type="submit">Ajouter</Button>
        </Form>
      </Container>
    </div>
  );
}

export default Admin;
