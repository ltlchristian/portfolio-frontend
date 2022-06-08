import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = "http://localhost:3001";

const base = axios.create({ baseURL });

const services = {
  login(body) {
    // email, password
    return base.post("/auth/login", body).then((res) => res.data);
  },

  signup(body) {
    // email, password, confirmPassword
    return base.post("/auth/signup", body);
  },

  getInfos() {
    return base.get(`/sites`).then((res) => res.data);
  },

  getProjects(title) {
    return base.get(`/projects?title=${title}`).then((res) => res.data);
  },

  getProject(id) {
    return base.get(`/projects/${id}`).then((res) => res.data);
  },

  addLikes(id) {
    return base.post(`/projects/${id}/likes`, {}).then((res) => res.data);
  },

  createProject(body) {
    const token = localStorage.getItem("jwt");
    return base
      .post("/projects", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getTechnos() {
    return base.get(`/technos`).then((res) => res.data);
  },

  createTechno(body) {
    const token = localStorage.getItem("jwt");
    return base
      .post("/technos", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  searchByTitle(title) {
    if (title === "") {
      title = "All";
    }
    return base.get(`/projects/search/${title}`).then((res) => res.data);
  },

  deleteProject(idProject) {
    const token = localStorage.getItem("jwt");
    return base
      .delete(`/projects/${idProject}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch((err) => {
        const { data, status } = err.response;
        const response = { data, status };
        return response;
      });
  },

  updateProject(idProject, body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`/projects/${idProject}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  updateSite(idSite, body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`/sites/${idSite}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};

export default services;
