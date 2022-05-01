import React, { useEffect, useState } from "react";
import "./Carousel.css";
import Carousel from "react-bootstrap/Carousel";
import services from "../../services";

const CarouselMain = () => {
  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    services
      .getCarouselImg()
      .then((response) => {
        console.log(response);
        setCarousels(response);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="carousel-main">
      <h4 className="carousel-title">Last Projects</h4>
      <Carousel className="carousel-div">
        {/* <Carousel.Caption>
            <p>HTML / CSS</p>
          </Carousel.Caption> */}
        {carousels.map((carousel) => (
          <Carousel.Item key={carousel._id} interval={3500} className="carousel-item">
            <img
              className="d-block w-100"
              src={`/images/${carousel.carousel_img}`}
              alt="slides"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselMain;
