import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Button, Card} from 'react-bootstrap';
import services from "../../services";
import "./ProjectDetail.css";

export default function ProjectDetail() {
    const [project, setProject] = useState({
      techno: []
    });
    const [likes, setLikes] = useState(0);

    let { idProject } = useParams();

    function isHttpImage(image) {
      return image && image.startsWith('http');
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
    }

    useEffect(() => {
      services
        .getProject(idProject)
        .then((response) => {
          console.log(response);
          setProject(response);
          setLikes(response.likes);
        })
        .catch(console.log);
    }, []);

  return (
    <div className="itemProject">
        <Card style={{ width: '60%' }}>
          { isHttpImage(project.image) ? <Card.Img variant="top" src={`${project.image}`} /> : <Card.Img variant="top" src={`/images/${project.image}`} /> }
          <Card.Body>
            <Card.Title>
              { project.title }
            </Card.Title>
            <p>
              {project.techno.map((techno) => (
                <span key={techno._id} className="badge rounded-pill bg-info text-dark">{techno.label}</span>
              ))}
            </p>
            <h5>Likes: <Badge bg="secondary">{ likes }</Badge></h5>
            <Button onClick={() => addLike(project._id)} variant="success">LIKE</Button>
            <Card.Text>
              { project.summary }
            </Card.Text>
            <p>
              <a href={project.lien_github} target="_blank"><i className="fa-brands fa-github-square github"></i></a>
            </p>
            <Card.Text>
              { project.content }
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  )
}