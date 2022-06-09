import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card} from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import parse from 'html-react-parser';
import services from "../../services";
import "./ProjectDetail.css";

export default function ProjectDetail() {
    const [project, setProject] = useState({
      techno: []
    });
    const [likes, setLikes] = useState(0);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    let { idProject } = useParams();

    function isHttpImage(image) {
      return image && image.startsWith('http');
    }

    useEffect(() => {
      services
        .getProject(idProject)
        .then((response) => {
          console.log(response);
          setProject(response);
          setLikes(response.likes);
          setContent(response.content);
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
            <div>
              {project.techno.map((techno) => (
                <span key={techno._id} className="badge rounded-pill bg-info text-dark m-1">{techno.label}</span>
              ))}
            </div>
            <Card.Text>
              { project.summary }
            </Card.Text>
            {project.lien_github && !project.lien_github_back && <div>
              <a href={project.lien_github} target="_blank">
                <i className="fa-brands fa-github-square github"></i>
              </a>
            </div>}
            {project.lien_github && project.lien_github_back && <div>
              <a href={project.lien_github} target="_blank">
                <i className="fa-brands fa-github-square github"></i>
              </a>            
              <a href={project.lien_github_back} target="_blank">
                <i className="fa-brands fa-github-square github"></i>
              </a>
            </div>}     
            {project.lien_web && <div>
              <a href={project.lien_web} target="_blank">
              <VisibilityIcon/>
              </a>
            </div>}
            {parse(content)}
            <hr/>
            <Button variant="outline-secondary" onClick={() => navigate("/project")}>Retour</Button>
          </Card.Body>
        </Card>
    </div>
  )
}