import React from "react";
import "./style.css";

export const Pad = ({ active, soundNum, padColor, selectSample }) => {

  return (
      <div className={"pad-active"}
        onClick={handleClick}
      >
        <div
          className={"pad-rectangle"}
          style={{
            ...{
              backgroundColor: padColor,
              background: active
                ? "radial-gradient(50% 50% at 50% 50%, rgb(255, 255, 255) 20.83%, rgb(255, 255, 255) 33.85%, rgb(242.25, 242.25, 242.25) 64.58%, rgb(214.62, 214.62, 214.62) 100%)"
                : padColor,
              boxShadow: !active
                ? "6px 7px 4px #00000040 , 9px 14px 15px #00000040 , inset -3px -3px 3px #0000006b , inset 2px 2px 2px #cecece"
                : "inset -1px -1px 2px #eaeaeadb , inset 2px 2px 2px #ffffff , 0px 0px 14px 2px #ffffff"
            },
          }}
        />
        <div className={"soundNum"} style={{
          ...{
            color: active ? padColor : "#ffffff"
          }
        }}>{soundNum}</div>
      </div>
  );

  function handleClick() {
    if (active === true) {
      selectSample(0);
    }
    else {
      selectSample(soundNum);
    }
  }
};
