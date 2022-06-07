import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import services from "../../services";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./EditProject.css";
export default function EditProject() {
    const [body, setBody] = useState({
        title: "",
        summary: "",
        image: "",
        lien_github: "",
        lien_web: "",
        content: "",
        techno: [],
    });
    const [open, setOpen] = useState(false);
    let { idProject } = useParams();
    const navigate = useNavigate();
   
    function updateBody(key, value) {
        setBody({ ...body, [key]: value });
    }

    function handleFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        if (!name.startsWith("techno")) {
          updateBody(name, value);
        } else {
          const newActivities = body.techno.map((activity) => {
            if (activity._id === value) {
              activity.checked = !activity.checked;
            }
            return activity;
          });
          setBody({ ...body, techno: newActivities });
        }
    }
        
      function handleSubmit(event) {
        event.preventDefault();
    
        const { techno } = body;
    
        const updatedTechnos = techno
          .filter((activity) => activity.checked)
          .map((activity) => activity._id);
    
        const updatedProject = { ...body, techno: updatedTechnos };
        services
          .updateProject(idProject, updatedProject)
          .then(() => setOpen(true))
          .catch(() => alert("Une erreur pendant la mise à jour d'un role"));
      }

  /* Effet de bord au premier rendu du composant */
  useEffect(() => {
    Promise.all([
      services.getTechnos(),
      services.getProject(idProject),
    ])
      .then((values) => {
        const dbTechnos = values[0];
        const dbProject = values[1];

        // Traitement pour initialiser le body avec le role récupéré en base
        const tabTechnosForCheck = dbProject.techno.map(
          (techno) => techno._id
        );

        const newActivities = dbTechnos.map((activity) => {
          const foundIndex = tabTechnosForCheck.indexOf(activity._id);
          if (foundIndex !== -1) {
            activity.checked = true;
          } else {
            activity.checked = false;
          }
          return activity;
        });

        setBody({
          ...body,
          title: dbProject.title,
          summary: dbProject.summary,
          image: dbProject.image,
          lien_github: dbProject.lien_github,
          lien_web: dbProject.lien_web,
          content: dbProject.content,
          techno: newActivities,
        });
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);


  return (
    <Container className="edit-project">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titre du projet</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Titre du projet" 
              name="title" 
              value={body.title}
              onChange={handleFormChange} 
              required
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="technos">
              <Form.Label>Technos utilisées</Form.Label>
              {body.techno.map((techno) => (
                <Form.Check
                    type="checkbox"
                    id="techno1"
                    value={techno._id}
                    checked={techno.checked}
                    name={`techno${techno._id}`}
                    label={techno.label}
                    onChange={handleFormChange}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-3" controlId="summary">
            <Form.Label>Résumé du projet</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="résumé du projet" 
              name="summary" 
              value={body.summary} 
              onChange={handleFormChange}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image du projet</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Exemple: projet1.png ou bien https://api.lorem.space/image/movie?w=150&h=220&hash=225E6693" 
              name="image" 
              value={body.image}
              onChange={handleFormChange}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lien_github">
            <Form.Label>Lien github</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Exemple: https://github.com/A-Lari/frontend-portfolio" 
              name="lien_github" 
              value={body.lien_github}
              onChange={handleFormChange}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lien_web">
            <Form.Label>Lien web</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Exemple: https://livetag-frontend.osc-fr1.scalingo.io/" 
              name="lien_web" 
              value={body.lien_web}
              onChange={handleFormChange}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
            <Form.Label>Contenu du projet</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Contenu du projet" 
              name="content" 
              value={body.content}
              onChange={handleFormChange}
            />
            </Form.Group>

            <Button variant="outline-secondary" onClick={() => navigate("/project")}>Retour</Button>
            <Button variant="outline-success" type="submit">Enregistrer</Button>
        </Form>
        <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
          <Alert variant="filled" severity="success">
            {`Le projet ${body.title} a été modifié`}
          </Alert>
        </Snackbar>        
    </Container>
  )
}
