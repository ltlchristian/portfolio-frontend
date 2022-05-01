import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, Col } from "react-bootstrap";
import services from "../../services";
import("./Project.css");

export default function Project(project) {
  const [likes, setLikes] = useState(project.likes);

  function isHttpImage(image) {
    return image && image.startsWith("http");
  }

  const addLike = (idProject) => {
    console.log("==> addLike", idProject);
    services
      .addLikes(idProject)
      .then((response) => {
        console.log(response);
        setLikes(response.likes);
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
          <p>
            {project.techno.map((techno) => (
              <span
                key={techno._id}
                className="badge rounded-pill bg-info text-dark"
              >
                {techno.label}
              </span>
            ))}
          </p>
          <h5>
            Likes: <Badge bg="secondary">{likes}</Badge>
          </h5>
          <Card.Text>{project.summary}</Card.Text>
          <p>
            <a href={project.lien_github} target="_blank">
              <i className="fa-brands fa-github-square github"></i>
            </a>
          </p>
          <Button variant="primary">
            <Link className="boutonvoir" to={`/project/${project._id}`}>
              VOIR
            </Link>
          </Button>
          <Button onClick={() => addLike(project._id)} variant="success">
            LIKE
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
