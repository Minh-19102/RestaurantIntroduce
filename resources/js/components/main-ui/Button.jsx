import React, { useState } from "react";
import "./Button.css";
const btnStyle = ["btn-primary", "btn-navbar-type", "btn-normal"];
const btnSize = ["btn-large", "btn-big", "btn-normal", "btn-small"];

function Button(props) {
  let styles, size;
  if (props.btnStyle == undefined) styles = btnStyle[0];
  else styles = props.btnStyle;
  if (props.btnSize == undefined) size = btnSize[0];
  else size = props.btnSize;
  return <button className={`${styles} ${size}`}>{props.children}</button>;
}

export default Button;
