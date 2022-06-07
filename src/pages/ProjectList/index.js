import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import services from "../../services";
import Project from "../../components/Project";
import "./ProjectList.css";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [inputTitle, setInputTitle] = useState("");

  const search = (searchTitle) => {
    services
      .getProjects(searchTitle)
      .then((result) => {
        setProjects(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSearchChange = (e) => {
    setInputTitle(e.target.value);
    if(e.target.value === "") {
      search("");
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    search(inputTitle);
  };

  useEffect(() => {
    search("");
  }, []);

  return (
    <Container className="porfolio">

      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <form className="d-flex" onSubmit={handleSubmitSearch}>
            <input
              className="form-control me-2"
              type="search"
              onChange={handleSearchChange}
              value={inputTitle}
              placeholder="Un titre"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              Chercher
            </button>
          </form>
        </div>
      </nav>

      <Row>
        {projects.map((project) => (
          <Project key={project._id} {...project}>{ project.content }</Project>
        ))}
      </Row>
    </Container>
  );
}
