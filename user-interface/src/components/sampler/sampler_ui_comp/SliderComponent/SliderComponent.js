import React from "react";
import "./style.css";

export const SliderComponent = (props) => {

  const setVal = (toVal) => {
    props.setVal(toVal);
  }

  return (
    <div>
      <input
        type="range"
        min={props.minVal}
        max={props.maxVal}
        defaultValue={props.defaultVal} 
        className="slider" 
        id={props.id} 
        onChange={(e) => setVal(e.target.value)}/>
    </div>
  );
};
