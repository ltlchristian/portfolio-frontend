import "./Home.css";
import services from "../../services";
import CarouselMain from "../../components/Carousel/CarouselMain";

import { useEffect, useState } from "react";

const Home = () => {
  const [infos, setInfos] = useState({});
  useEffect(() => {
    services
      .getInfos()
      .then((response) => {
        console.log(response);
        setInfos(response);
      })
      .catch(console.log);
  }, []);
  return (
    <div className="home-body">
      <div
        className="body-img"
        style={{ backgroundImage: `url(/images/${infos.background_img})` }}
      >
        <div className="body-sum">
          <h2>{infos.presentation_titre}</h2>
          <h5>{infos.presentation_sum}</h5>
        </div>
      </div>
      <CarouselMain />
    </div>
  );
};

export default Home;
