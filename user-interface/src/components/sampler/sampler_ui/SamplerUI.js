import React, { useContext, useEffect, useState } from "react";
import { Stepper } from "../sampler_ui_comp/Stepper/Stepper";
import { Pad } from "../sampler_ui_comp/Pad/Pad";
import "./style.css";
import { SliderComponent } from "../sampler_ui_comp/SliderComponent/SliderComponent";
import audioEngineContext from "../../../contexts/AudioEngineContext";
import { AudioSyncContext } from "../audioEngine/AudioEngine";
import { PreviewScreen } from "../sampler_ui_comp/PreviewScreen";
import { Effect } from "../sampler_ui_comp/Effect/Effect";
import SelectedSampleContext from "../../../contexts/SelectedSample";
import { TrackControl } from "../sampler_ui_comp/TrackControl/TrackControl";
import stepStatsContext from "../../../contexts/StepStatsContext";
import vector2 from "../../../img/vector-2.svg"

const keyBindings = ['1', '2', '3', '4',
                     'q', 'w', 'e', 'r',
                     'a', 's', 'd', 'f'];

export const SamplerUI = () => {
  const [audioEngine, setAudioEngine] = useContext(audioEngineContext);
  /** @type {AudioSyncContext} */const syncContext = audioEngine.getSyncContext();
  const [selectedSample, setSelectedSample] = useContext(SelectedSampleContext);
  const [recording, setRecording] = useState(syncContext.isRecording());
  const [playing, setPlaying] = useState(syncContext.getPlaybackState());
  const [metronomeEnabled, setMetronomeEnabled] = useState(audioEngine.isMetronomeEnabled());


  //Init Key Bindings
  const HandleKeyDown = e => {
      const bindingIndex = keyBindings.findIndex(binding => binding === e.key);
      if(bindingIndex === -1) return;
      console.log(`Playing: ${bindingIndex}`);
      audioEngine.getTracks()[bindingIndex].getSamplePlayer().play();
  }

  const [stepStats, setStepStats] = useContext(stepStatsContext);

  useEffect(() => {
    console.log("curr sample:", selectedSample);
  }, [selectedSample])

  useEffect(() => {
    console.log(stepStats);
  }, [stepStats])

  // playback position monitoring
  useEffect(() => {
    console.log(syncContext.getPlaybackPosition());
  }, []);

  // playback control
  const playCallback = () => {
    syncContext.setPlaybackState(
      syncContext.getPlaybackState() === AudioSyncContext.PlaybackState.PAUSED ?
        AudioSyncContext.PlaybackState.PLAYING :
        AudioSyncContext.PlaybackState.PAUSED);
  }

  // clear control
  const clearCallback =() => {
    audioEngine.clearRecording();
    updateSchedule();
  }

  // recording control
  const recordCallback = () => {
    syncContext.setRecording(!syncContext.isRecording());
    setRecording(syncContext.isRecording());
  }

  // metronome callback
  const metronomeCallback = () => {
    audioEngine.setMetronomeEnabled(!audioEngine.isMetronomeEnabled());
    setMetronomeEnabled(audioEngine.isMetronomeEnabled());
  }

  // slider value control
  const handleVolume = (volume) => {
    audioEngine.setMasterVolume(volume / 100);
  }

  const handleTempo = (tempo) => {
    audioEngine.getSyncContext().setTempo(tempo);
  }

  // selected sample context control
  const selectSample = (sample) => {
    setSelectedSample(sample);
    setStepStats(Array(16).fill(false))
  }

  const updateSchedule = () => {
    const tempSteps = Array(16).fill(false);
    if(selectedSample !== 0) {
      const schedule = audioEngine.getTracks()[selectedSample - 1].getSamplePlayer().getSchedule();
      schedule.forEach(startTime => {
        const time = Math.round(startTime * 2);
        tempSteps[time % 16] = true;
      })
    }
    setStepStats(tempSteps);
  }

  useEffect(updateSchedule, [selectedSample]);

  // selected stepper context control
  const selectStep = (stepperNum, currVal) => {
    if(selectedSample === 0) return;
    if(currVal) { // Is on should turn off
      audioEngine.getTracks()[selectedSample - 1].getSamplePlayer().descheduleArea((stepperNum - 1) / 2 - .25, .5);
    } else {
      audioEngine.getTracks()[selectedSample - 1].getSamplePlayer().schedule((stepperNum - 1) / 2);
      
    }
    
    updateSchedule();
  }

  let playbackStateCallback = (playbackState, playbackPosition) => {
    setPlaying(playbackState === AudioSyncContext.PlaybackState.PLAYING);
  }

  useEffect(() => {
    audioEngine.getSyncContext().addClockCallback(playbackStateCallback);
    return () => {
      audioEngine.getSyncContext().removeClockCallback(playbackStateCallback);
    }
  }, [audioEngine]);


  return (
    <div className={"frame-frame"} onKeyDown={HandleKeyDown}>
      <div className={"frame-overlap"}>
        <img className="frame-vector-1" src={vector2} alt="cir" />
        <img className="frame-vector-2" src={vector2} alt="cir" />
        <img className="frame-vector-3" src={vector2} alt="cir" />
        <img className="frame-vector-4" src={vector2} alt="cir" />
        <PreviewScreen />
        <div className={"sample-preview"}>
          <div className={"sample-sound-btn"}>
            <div className={"sample-sound-circle"} />
            <div className={"sample-sound-icon"}/>
          </div>
          <div className={"frame-group"}>
            <div className={"frame-group-36"}>
              <div className={"frame-text-wrapper-28"}>*Sample Name*</div>
              <div className={"frame-text-wrapper-29"}>*Sample Info*</div>
              <div className={"frame-text-wrapper-30"}>Preview</div>
              <div className={"frame-text-wrapper-31"}>*Sample Effects*</div>
              <div className={"frame-text-wrapper-32"}>*Sample Duration*</div>
            </div>
          </div>
        </div>
        <div className={"effect-buttons"}>
          <div className={"effect-delay"} onClick={() => { console.log("effect 1 pressed") }}>
            <Effect active={false} text="Delay" />
          </div>
          <div className={"effect-reverb"}>
            <Effect active={false} text="Reverb" />
          </div>
          <div className={"effect-3"}>
            <Effect active={false} text="Effect" />
          </div>
          <div className={"revert-effects"}>
            <Effect active={false} text="Revert" />
          </div>
        </div>
        <div className={"track-record-button"} onClick={recordCallback}>
          <TrackControl active={recording} control_text="RECORD"></TrackControl>
          <div className="track-record-icon" />
        </div>
        <div className={"track-play-button"} onClick={playCallback}>
          <TrackControl active={playing} control_text="PLAY"></TrackControl>
          <div className={playing ? "track-pause-icon" : "track-play-icon"} />
        </div>
        <div className={"track-clear-button"} onClick={clearCallback}>
          <TrackControl control_text="CLEAR"></TrackControl>
          <div className="track-clear-icon" />
        </div>
        <div className={"track-metronome-button"} onClick={metronomeCallback}>
          <TrackControl control_text="METRONOME" active={metronomeEnabled}></TrackControl>
          <div className="track-metronome-icon" />
        </div>
        <div className={"frame-step-buttons"}>
          {
            stepStats.map((active, index) => <Stepper key={index} isOn={active} stepperNum={index + 1} selectStep={selectStep}/>)
          }

        </div>
        <div className={"frame-sound-pads"}>
          <div className={"sound-pad-1"}>
            <Pad active={selectedSample === 1} padColor="#FF8387" soundNum={1} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-2"}>
            <Pad active={selectedSample === 2} padColor="#FEC188" soundNum={2} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-3"}>
            <Pad active={selectedSample === 3} padColor="#FFFF87" soundNum={3} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-4"}>
            <Pad active={selectedSample === 4} padColor="#82FF87" soundNum={4} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-5"}>
            <Pad active={selectedSample === 5} padColor="#83D188" soundNum={5} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-6"}>
            <Pad active={selectedSample === 6} padColor="#82FFC3" soundNum={6} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-7"}>
            <Pad active={selectedSample === 7} padColor="#82FFFF" soundNum={7} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-8"}>
            <Pad active={selectedSample === 8} padColor="#82C1FF" soundNum={8} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-9"}>
            <Pad active={selectedSample === 9} padColor="#8283FF" soundNum={9} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-10"}>
            <Pad active={selectedSample === 10} padColor="#C183FF" soundNum={10} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-11"}>
            <Pad active={selectedSample === 11} padColor="#FF83FF" soundNum={11} selectSample={selectSample} />
          </div>
          <div className={"sound-pad-12"}>
            <Pad active={selectedSample === 12} padColor="#FF83C3" soundNum={12} selectSample={selectSample} />
          </div>
        </div>
        <div className={"frame-volume-slider"}>
          <SliderComponent setVal={handleVolume} defaultVal={100} minVal={0} maxVal={150} />
          <div className={"frame-text-wrapper-46"}>VOLUME</div>
        </div>
        <div className={"frame-tempo-slider"}>
          <SliderComponent setVal={handleTempo} defaultVal={120} minVal={60} maxVal={200}/>
          <div className={"frame-text-wrapper-47"}>TEMPO</div>
        </div>
        <img className={"frame-speaker-circles"} src={require("../../../img/speaker-circles.png")} alt="cir" />
      </div>
    </div>

  );
};
