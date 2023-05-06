import React from "react";
import { useReducer } from "react";
import "./style.css";

export const Effect = ({ active, text = "Label" }) => {
  const [state, dispatch] = useReducer(reducer, {
    active: active || false,
  });

  return (
    <div className={"effect"} onClick={() => { dispatch("click"); }}>
      <div className={"effect-background-rectangle"}>
        <div
          className={"effect-active-true-style"}
          style={{
            backgroundColor: state.active === true ? "#a1a2a6" : undefined,
            borderRadius: state.active === true ? "6px" : undefined,
            boxShadow: state.active === true ? "inset 2px 2px 1px -1px #bbbdc7 , inset -1px -1px 1px #2c2929cc" : undefined,
            height: state.active === true ? "50px" : "50px",
            top: state.active === true ? "1px" : undefined,
          }}
        >
          {
            state.active === false ? <React.Fragment>
              <div className={"button-shade"} />
              <div className={"button-rectangle"} />
            </React.Fragment> : undefined
          }
        </div>
      </div>
      <div
        className={"effect-light-background"}
        style={{
          top: state.active === true ? "22px" : "20px",
        }}
      >
        <div
          className={"effect-light"}
          style={{
            backgroundColor: state.active === true ? "#ffffff" : "#696161",
            boxShadow:
              state.active === "on"
                ? "0px 0px 14px 5px #ffffffa6 , inset 0px 0px 1px 1px #ffffff"
                : "0px 0px 4px #93939373 , inset 0px 0px 1px 1px #505050",
          }}
        />
      </div>
      <div className={"effect-label"}
        style={{
          top: state.active === true ? "17px" : "15px",
        }}
      >
        {text}
      </div>
    </div>
  );
};

function reducer(state, action) {
  if (action === "click") {
    if (state.active === true) {
      return {
        ...state,
        active: false,
      };
    }
    else {
      return {
        ...state,
        active: true,
      };
    }
  }

  return state;
}