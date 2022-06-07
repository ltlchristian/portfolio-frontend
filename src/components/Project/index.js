import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, Col } from "react-bootstrap";
import GitHubIcon from '@mui/icons-material/GitHub';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import("./Project.css");

export default function Project(project) {
  const { connected, disconnect } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function isHttpImage(image) {
    return image && image.startsWith("http");
  }

  const removeProject = (idProject) => {
    services
      .deleteProject(idProject)
      .then((response) => {
        setOpen(true);
        navigate(0);
      })
      .catch(console.log);
  };

  return (
    <Col>
      <Card style={{ width: "20rem" }}>
        {isHttpImage(project.image) ? (
          <Card.Img variant="top" src={`${project.image}`} />
        ) : (
          <Card.Img variant="top" src={`/images/${project.image}`} />
        )}
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <div>
            {project.techno.map((techno) => (
              <span
                key={techno._id}
                className="badge rounded-pill bg-info text-dark m-1"
              >
                {techno.label}
              </span>
            ))}
          </div>
          <Card.Text>{project.summary}</Card.Text>
          {project.lien_github && <div>
            <a href={project.lien_github} target="_blank">
              <i className="fa-brands fa-github-square github"></i>
            </a>
          </div>}
          {project.lien_web && <div>
            <a href={project.lien_web} target="_blank">
            <VisibilityIcon/>
            </a>
          </div>}
          <Link to={`/project/${project._id}`}><Button variant="outline-success">{connected ? "Editer" : "Détails"}</Button></Link>
          {connected && <Button onClick={() => removeProject(project._id)} variant="outline-danger">Supprimer</Button>}
        </Card.Body>
      </Card>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert variant="filled" severity="success">
          {`Le projet ${project.title} a été supprimé`}
        </Alert>
      </Snackbar>
    </Col>
  );
}
