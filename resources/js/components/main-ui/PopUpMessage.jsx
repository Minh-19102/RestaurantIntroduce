import React from "react";
import "../../../css/PopUpMessage.css";
function PopUpMessage(props) {
  const styles = ["greenPopUp", "redPopUp"];
  let messageStyle = styles[0];
  if (props.messageStyle != undefined) messageStyle = props.messageStyle;
  return <div className={messageStyle}>{props.children}</div>;
}

export default PopUpMessage;
