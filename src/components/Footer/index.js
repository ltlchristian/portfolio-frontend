import React, { useEffect, useState } from "react";
import "./Footer.css";
import services from "../../services";

const Footer = () => {
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
    <div className="footer">
      <p className="footer-content"> &copy; {infos.footer}</p>
    </div>
  );
};

export default Footer;
