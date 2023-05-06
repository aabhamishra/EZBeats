import React, {useContext, useEffect, useRef, useState} from "react";
import audioEngineContext from "../../../contexts/AudioEngineContext";

export const BeatMeter = () => {

    const [audioEngine, setAudioEngine] = useContext(audioEngineContext);
    const [highlighted, setHighlighted] = useState(0);
    const [tracks, setTracks] = useState(0);
    const [groupTranform, setGroupTransform] = useState("");

    const svgRef = useRef(null);

    const clockCallback = (playbackState, playbackPosition) => {
        setHighlighted(Math.floor(playbackPosition * 2));
    };


    let dots = [];
    for(let i = 0; i < 16; i++) {
        dots.push(<circle key={i} cx={`${100 * i + 50}`} cy="0" r={i % 2 === 0 ? "20" : "15"} fill={i === highlighted ? "red":"white"}></circle>)
    }

    useEffect(() => {
        console.log(svgRef);
        setGroupTransform(`translate(0, ${svgRef.current.clientHeight / 2}) scale(${svgRef.current.clientWidth / 1650}, ${svgRef.current.clientWidth / 1650}) translate(50,0)`);       
    }, [svgRef, tracks]);

    useEffect(() => {
        audioEngine.getSyncContext().addClockCallback(clockCallback);
        setTracks(audioEngine.getTracks().length);
        
        return () => audioEngine.getSyncContext().removeClockCallback(clockCallback);
    }, [audioEngine]);

    return <svg ref={svgRef} width="100%" height="100%">
        <g transform={groupTranform}>
            {dots}
        </g>
    </svg>
}