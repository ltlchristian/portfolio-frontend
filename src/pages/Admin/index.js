import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import "./Admin.css";

function Admin() {
  const [body, setBody] = useState({
    label: "",
  });

  const [presentation, setPresentation] = useState({});

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

  function updateSite(key, value) {
    setPresentation({ ...presentation, [key]: value });
  }

  function handleFormChangeSite(event) {
    const name = event.target.name;
    const value = event.target.value;
    updateSite(name, value);
  }

  function handleSubmitSite(event) {
    event.preventDefault();

    const { presentation_titre, presentation_sum, footer } = presentation;

    const updatedSite = { presentation_titre, presentation_sum, footer };
    services
      .updateSite(presentation._id, updatedSite)
      .catch(() => alert("Une erreur pendant la mise à jour des infos du site"));
  }

  useEffect(() => {
    services
      .getInfos()
      .then((response) => {
        setPresentation(response);
      })
      .catch(console.log);
  }, []);

  return (
    <Container className="admin">
      <h2>Technos</h2>
      <Form onSubmit={handleSubmitTechnos}>
          <Form.Group className="mb-3" controlId="label">
            <Form.Label>label</Form.Label>
            <Form.Control type="text" placeholder="libellé techno" name="label" onChange={handleFormChangeTechnos} required/>
          </Form.Group>
          <Button variant="primary" type="submit">Ajouter</Button>
      </Form>
      <hr/>
      <h2>Site</h2>
      <Form onSubmit={handleSubmitSite}>
          <Form.Group className="mb-3" controlId="presentation_titre">
            <Form.Label>presentation_titre</Form.Label>
            <Form.Control type="text" placeholder="un titre" name="presentation_titre" value={presentation.presentation_titre} onChange={handleFormChangeSite} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="presentation_sum">
            <Form.Label>presentation_sum</Form.Label>
            <Form.Control type="text" placeholder="un texte" name="presentation_sum" value={presentation.presentation_sum} onChange={handleFormChangeSite} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="footer">
            <Form.Label>footer</Form.Label>
            <Form.Control type="text" placeholder="un texte" name="footer" value={presentation.footer} onChange={handleFormChangeSite} required/>
          </Form.Group>            
          <Button variant="primary" type="submit">Modifier</Button>
      </Form>
  </Container>
  );
}

export default Admin;
