import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import "./Home.css";
import services from "../../services";

const Home = () => {
  const [infos, setInfos] = useState({});
  useEffect(() => {
    services
      .getInfos()
      .then((response) => {
        setInfos(response);
      })
      .catch(console.log);
  }, []);
  return (
    <div className="global-container w-100 h-100 bg-dark position-relative">
      <div
        className="body-img"
        style={{ backgroundImage: `url(/images/${infos.background2_img})` }}
      >
        <div className="body-sum">
          <p class="fs-1 text-light mb-0">Christian Ly</p>
          <h1 class="text-center display-3 fw-bolder text-light">{infos.presentation_titre}</h1>
          <p class="fs-4 text-light mb-4">{infos.presentation_sum}<a href="https://kodyneo.io/">Kodyneo</a></p>
          <a href="/images/christianly.pdf" title="Pdf" target="_blank"><Button variant="outline-primary">CV</Button></a>
          <a href="https://github.com/ltlchristian" title="Pdf" target="_blank"><Button variant="outline-secondary">GitHub</Button></a>
        </div>
      </div>
    </div>
  );
};

export default Home;
