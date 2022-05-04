import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Card.css";

export default function Card(props) {
  const [img, setImg] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/restaurant-image/" + props.id).then(
      (data) => setImg(data)
    );
  }, []);
  return (
    <div className="card">
      <img src={img.url} />
      <div className="restaurant-id">#{props.id}</div>
      <h1>{props.name}</h1>
      <p>{props.introduction}</p>
    </div>
  );
}
