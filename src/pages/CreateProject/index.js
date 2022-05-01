import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import services from "../../services";
import "./CreateProject.css";
export default function CreateProject() {
    const [body, setBody] = useState({
        title: "",
        summary: "",
    });
    const [technos, setTechnos] = useState([]);
    const [checkTechnos, setCheckTechnos] = useState([]);

    const navigate = useNavigate();
   
    function updateBody(key, value) {
        // Il faut toujours faire une copie du state qu'on veut modifier si c'est un objet
        // objet = {  } ou [ ]
        setBody({ ...body, [key]: value });
    }
    
    function handleFormChange(event) {
        console.log(event);
        const name = event.target.name; // title
        const value = event.target.value; // toto@toto.com
        if (!name.startsWith('techno')) {
          updateBody(name, value);
        } else {
          console.log(event.target.checked);
          if (event.target.checked) {
            const newTechnos = [...technos].concat(value);
            setTechnos(newTechnos);
            setBody({ ...body, techno: newTechnos });
          } else {
            const newTechnos = [...technos];
            var myIndex = newTechnos.indexOf(value);
            if (myIndex !== -1) {
              newTechnos.splice(myIndex, 1);
            }
            setTechnos(newTechnos);
            setBody({ ...body, techno: newTechnos });
          }
          console.log(technos);
        }
    }
    
    function handleSubmitSignup(event) {
        event.preventDefault();
        console.log(body);

        services
          .createProject(body)
          .then(() => navigate("/"))
          .catch(() => alert("ça ne s'est pas passé comme prévu"));
    }

    useEffect(() => {
        services
          .getTechnos()
          .then((response) => {
            console.log(response);
            setCheckTechnos(response);
          })
          .catch(console.log);
    }, []);

  return (
    <Container>
        <Form onSubmit={handleSubmitSignup} onChange={handleFormChange} >
            <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titre du projet</Form.Label>
            <Form.Control type="text" placeholder="Titre du projet" name="title" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="technos">
              <Form.Label>Technos utilisées</Form.Label>
              {checkTechnos.map((techno) => (
                <Form.Check type="checkbox" id="techno1" value={techno._id} name={`techno${techno._id}`} label={techno.label} />
              ))}
            </Form.Group>

            {/*<Form.Group className="mb-3" controlId="technos">
              <Form.Label>Technos utilisées</Form.Label>
              <Form.Check type="checkbox" id="techno1" value="6267e689d4cfc97249c80a18" name="techno1" label="HTML" />
              <Form.Check type="checkbox" id="techno2" value="6267e69fd4cfc97249c80a1c" name="techno2" label="REACT" />
              <Form.Check type="checkbox" id="techno3" value="6267e696d4cfc97249c80a1a" name="techno3" label="JAVASCRIPT" />
              <Form.Check type="checkbox" id="techno4" value="6267e6a5d4cfc97249c80a1e" name="techno4" label="MERN" />
          </Form.Group>*/}

            <Form.Group className="mb-3" controlId="summary">
            <Form.Label>Résumé du projet</Form.Label>
            <Form.Control type="text" placeholder="résumé du projet" name="summary"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image du projet</Form.Label>
            <Form.Control type="text" placeholder="Exemple: projet1.png ou bien https://api.lorem.space/image/movie?w=150&h=220&hash=225E6693" name="image"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="lien_github">
            <Form.Label>Lien github</Form.Label>
            <Form.Control type="text" placeholder="Exemple: https://github.com/A-Lari/frontend-portfolio" name="lien_github"/>
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="content">
            <Form.Label>Contenu du projet</Form.Label>
            <Form.Control type="text" placeholder="Contenu du projet" name="content"/>
            </Form.Group>

            <Button variant="primary" type="submit">Enregistrer</Button>
        </Form>
    </Container>
  )
}

/*
  title: String,
  summary: String,
  image: String,
  lien_github: String,
  content: String,
  techno: [],
  comment: [],
  likes: Number,
 */ 