import React, {useContext, useEffect} from "react";
import audioEngineContext from "../../../contexts/AudioEngineContext";
import context from "react-bootstrap/esm/AccordionContext";

const lineWidth = 10;
const colors = ['#FF8387', '#FEC188', '#FFFF87', '#82FF87', '#83D188', '#82FFC3', '#82FFFF', '#82C1FF', '#8283FF', '#C183FF', '#FF83FF', '#FF83C3'];

function fitToContainer(canvas){
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

export const ArrangementView = () => {
    const [audioEngine, setAudioEngine] = useContext(audioEngineContext);

    const canvasRef = React.useRef();

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        fitToContainer(canvasRef.current);
        const animationId = requestAnimationFrame(() => drawArrangement(audioEngine, context, canvasRef.current));
        return () => cancelAnimationFrame(animationId);
    }, [canvasRef]);

    //TODO get colors from pad colors
    
    return (<canvas ref={canvasRef} height="100%" width="100%"/>)
}

const drawArrangement = function(audioEngine, ctx, canvas) {
    if(!canvas) return;
    ctx.save();
    let tracks = audioEngine.getTracks();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";

    ctx.save();
    ctx.scale(canvas.height / (16 * 100), canvas.height / (tracks.length * 100));
    tracks.forEach((track, index) => {
        const middleX = 25 / canvas.height * canvas.width;

        ctx.beginPath();
        ctx.font = "64px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(index + 1, middleX, 50);
        ctx.translate(0, 100);
    });
    ctx.restore();

    ctx.scale(canvas.width / 825, canvas.height / (tracks.length * 100));
    ctx.translate(25, 0);

    tracks.forEach((track, index) => {
        let linefill = ctx.fillStyle;
        ctx.beginPath();
        ctx.rect(0, 50 - lineWidth / 2, 800, lineWidth);
        ctx.fill();
        ctx.save();
        ctx.fillStyle = colors[index];
        track.getSamplePlayer().getSchedule().forEach(startTime => {
            ctx.beginPath();
            ctx.rect(50 * Math.round(startTime * 2), 0, 50, 100);
            if(ctx.fillStyle === linefill)console.log("SAME AS LINE");
            ctx.fill();
        });
        ctx.restore();
        ctx.translate(0, 100);
    });
    ctx.restore();
    window.requestAnimationFrame(timestamp => drawArrangement(audioEngine, ctx, canvas));
};