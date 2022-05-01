import React, { useEffect, useState } from "react";
import services from "../../services";

const Logo = () => {
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
    <div className="logo">
      <img className="logo-img" src={`/images/${infos.logo}`} />
      <h1 className="logo-title">{infos.title}</h1>
    </div>
  );
};

export default Logo;
