import React from "react";
import "../../../css/Home.css";
import backgroundImage from "../../../asset/image/bgmain.jpg";
function Home() {
  return (
    <div className="background-ctn">
      <div className="home-ctn">
        <div className="Restaurant-name">NimiRes</div>
        <div className="Restaurant-introduction">
          NimiRes is a VietNam restaurant chain headquartered in Hanoi. We was
          born out of love and respect for these humble deli creations, met with
          a desire to bring quality ingredients to the table. Simply put, we're
          here to bring you the best experience you can feel good about.
        </div>
      </div>
    </div>
  );
}

export default Home;
