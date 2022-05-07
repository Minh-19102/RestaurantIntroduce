import React, { useState } from "react";
import "./Button.css";
const btnStyle = [
  "btn-primary",
  "btn-navbar-type",
  "btn-type2",
  "add",
  "delete",
  "edit",
];
const btnSize = ["btn-large", "btn-big", "btn-normal", "btn-small"];

function Button(props) {
  let styles, size, color;
  if (props.btnStyle == undefined) styles = btnStyle[0];
  else styles = props.btnStyle;
  if (props.btnSize == undefined) size = btnSize[0];
  else size = props.btnSize;
  return (
    <button className={`${styles} ${size}`} onClick={props.btnClick}>
      {props.children}
    </button>
  );
}

export default Button;
