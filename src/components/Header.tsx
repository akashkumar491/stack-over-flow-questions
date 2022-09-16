import React from "react";
import profile from "../static/images.png";
const Header = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img src={profile} alt="Not Found" />
    </div>
  );
};

export default Header;
