import React from "react";
import "./style.css";

export const Stepper = ({ stepperNum, isOn, selectStep }) => {

  return (
    <div
      className={"stepper"}
      onClick={handleClick}
    >
      <div className={"stepper-pad"}>
        <div className={"stepper-overlap-group"}>
          <div className={"stepper-rectangle"} />
          <div
            className={"stepper-rectangle-26"}
            style={{
              backgroundColor: isOn ? "#39363b" : "#2a272b",
              boxShadow: isOn
                ? "inset -1px -1px 1px #0000006b , inset 0px 0px 1px 1px #1d1b1b"
                : "6px 7px 4px #00000040 , 9px 14px 15px #00000040 , inset -2px -2px 1px #0000006b , inset 1px 1px 1px #6e6868",
              top: isOn ? "2px" : "1px",
            }}
          />
          <div
            className={"stepper-rectangle-28"}
            style={{
              background: isOn
                ? "linear-gradient(180deg, rgb(62.74, 58.6, 64.81) 0%, rgb(26.68, 23.67, 28.69) 100%)"
                : "linear-gradient(180deg, rgb(50.33, 46.86, 52.06) 0%, rgb(26.68, 23.67, 28.69) 100%)",
              top: isOn ? "14px" : "13px",
            }}
          />
          <div
            className={"stepper-element"}
            style={{ top: isOn ? "18px" : "17px",}}
          >
            {stepperNum}
          </div>
        </div>
      </div>
      <div className={"stepper-group"}>
        <div
          className={"stepper-rectangle-30"}
          style={{
            backgroundColor: isOn ? "#ffffff" : "#1a1a1a",
            boxShadow: isOn
              ? "0px 0px 14px 5px #ffffffa6 , inset 0px 0px 1px 1px #ffffff"
              : "inset 1px 1px 3px #000000cc",
          }}
        />
      </div>
    </div>
  );

  function handleClick() {
      selectStep(stepperNum, isOn)
    }

};
