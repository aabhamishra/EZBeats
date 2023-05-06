import React, { useContext, useEffect } from "react";
import audioEngineContext from "../../../contexts/AudioEngineContext";
import { useState } from "react";
import { ArrangementView } from "./ArragementView.js";
import { BeatMeter } from "./BeatMeter";

export const PreviewScreen = () => {
    return (
        <>
            <div className={"frame-overlap-group14"}>
                <div style={{flex: 1, minHeight: 0}}>
                    <BeatMeter></BeatMeter>
                </div>
                <div style={{flex: 3, minHeight: 0}}>
                    <ArrangementView></ArrangementView> 
                </div>
            </div>
        </>
    )
}