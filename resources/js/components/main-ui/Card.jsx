import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../css/Card.css";
import Button from "../main-ui/Button";
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
      <Link to={`/RestaurantsList/${props.id}`}>
        <Button btnStyle="btn-type2">Learn more...</Button>
      </Link>
    </div>
  );
}
