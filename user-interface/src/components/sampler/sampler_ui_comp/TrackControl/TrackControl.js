import React from "react";
import "./style.css";

export const TrackControl = (props) => {
  //props has properties: light, style, text

  return (
    <div
      className={"button-shadow"}
      style={{
        ...{
          backgroundColor: props.active ? "#3e4046" : "#2d2d2d",
        },
        ...props.style,
      }}
    >
      <div className={"button-overlap-group"}
        style={{ border: "1px solid", borderColor: props.active ? "#ffffff66" : undefined, }}
      >
      <div className={"control-text"}>{props.control_text}</div>
      <div className={"button-square"}>
      </div>
      <div className={props.active ? 'light-on' : 'light-off'}/>    
      </div>
    </div>
  );
  
};