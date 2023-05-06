import AudioSyncContext from "./AudioSyncContext.js";

class SamplePlayer {
    /** @type {number} The time window in seconds where samples will be prescheduled.*/ static #SCHEDULE_AHEAD_TIME = .10;
    /** @type {AudioContext} AudioContext used by the SamplePlayer */ #audioContext;
    /** @type {AudioSyncContext} AudioSyncContext used to ensure timing of playback and recording */ #syncContext;
    /** @type {AudioNode[]} The destinations that audio will be sent to */ #destinations;
    /**
     * @type {AudioBuffer} 
     * An AudioBuffer containing the audio to be played.
     * This may be undefined if the sample has not loaded yet or had issues loading
    */ 
    #buffer;

    /** @type {AudioBufferSourceNode} The source node that will play audio. Will be recreated each time the sample is triggered. */
    #sourceNode;

    /** @type {number[]} A list containing start times in beats of when to trigger samples */ #recordedStartTimes;
    /** @type {boolean} True if a playback has been currently scheduled */ #playbackScheduled;
    /** @type {number} The original tempo of the sample*/ #trackTempo;
    /** @type {number} The number of cents the sample will be pitched up/down by*/ #detune;
    /** @type {function} The callback to run when the tempo changes*/ #tempoCallback;

    /**
     * Creates a new SamplePlayer
     * @param {AudioContext} audioContext 
     * @param {AudioSyncContext} syncContext 
     * @param {string} filepath The filepath used as an arguement to {@link fetch} to get the audio sample data
     */
    constructor(audioContext, syncContext, filepath) {
        this.#audioContext = audioContext;
        this.#syncContext = syncContext;
        this.setSample(filepath);
        this.#recordedStartTimes = [];
        this.#destinations = [];
        this.#detune = 0;

        this.#syncContext.addClockCallback(
            (playbackState, playbackPostion) => this.scheduleForPlayback(playbackState, playbackPostion)
        );

        this.#tempoCallback = tempo => {
            if(this.#sourceNode && this.#trackTempo) this.#sourceNode.playbackRate.value = tempo / this.#trackTempo;
        }

        this.#syncContext.addTempoCallback(this.#tempoCallback);
    }


    /**
     * Asynconously fetches and sets the sample that will be played by the track
     * @param {AudioContext} audioContext 
     * @param {string} filepath The filepath used by fetch to retrieve an audio file from the server
     * @returns 
     */
    setSample(filepath) {
        fetch(filepath)
        .then(response => {
            return response.arrayBuffer();
        })
        .then(arrayBuffer => {
            return this.#audioContext.decodeAudioData(arrayBuffer);
        })
        .then(audioBuffer => {
            this.#buffer = audioBuffer;
        })
        .catch(err => {
            console.log("Error Fetching Sample");
        });
    }

    /**
     * Schedules ahead recorded samples to be played when in play mode.
     * @param {AudioSyncContext.PlaybackState} playbackState 
     * @param {number} playbackPostion 
     */
    scheduleForPlayback(playbackState, playbackPostion) {
        if(this.#recordedStartTimes.length === 0) return;
        if(this.#destinations.length === 0) return;
        if(playbackState !== AudioSyncContext.PlaybackState.PLAYING) return;

        const beatsToNextTrigger = this.#recordedStartTimes.reduce((prev, startTime) => {
            let beatsToTrigger = startTime - playbackPostion;

            //In the case of wrapping around a loop
            if(beatsToTrigger < 0) beatsToTrigger = (startTime + (this.#syncContext.getLoopEnd() - this.#syncContext.getLoopStart())) - playbackPostion;
            return beatsToTrigger >= 0 ? Math.min(prev, beatsToTrigger) : prev;
        }, Infinity);

        const secToNextTrigger = beatsToNextTrigger / this.#syncContext.getTempo() * 60;

        if(secToNextTrigger < SamplePlayer.#SCHEDULE_AHEAD_TIME) {
            if(this.#playbackScheduled) return;
            this.#triggerSample(this.#audioContext.currentTime + secToNextTrigger);
        } else {
            this.#playbackScheduled = false;
        }
    }
    
    #triggerSample(time) {
        if(this.#sourceNode) this.#sourceNode.stop();
        this.#playbackScheduled = true;
        this.#sourceNode = this.#audioContext.createBufferSource();
        this.#sourceNode.buffer = this.#buffer;
        if(this.#trackTempo) this.#sourceNode.playbackRate.value = this.#syncContext.getTempo() / this.#trackTempo;
        this.#sourceNode.detune.value = this.#detune;
        this.#sourceNode.start(time);
            
        this.#destinations.forEach(destination => this.#sourceNode.connect(destination));
    }

    /**
     * @returns The schedule as an array with the start times in beats
     */
    getSchedule() {
        return this.#recordedStartTimes;
    }

    /**
     * Plays the sample immediately and records if the syncContext is in recording mode
     */
    play() {
        if(this.#syncContext.isRecording()) { //TODO fix quantized
            let quantizedTimestamp = Math.round(this.#syncContext.getPlaybackPosition() * this.#syncContext.getQuantizationFactor() / 4) / (this.#syncContext.getQuantizationFactor() / 4);
            this.#recordedStartTimes.push(this.#syncContext.isQuantizeEnabled() ? quantizedTimestamp : this.#syncContext.getPlaybackPosition());
        }
       
        this.#triggerSample(this.#audioContext.currentTime);
    }

    schedule(beat) {
        let quantizedTimestamp = Math.round(beat * this.#syncContext.getQuantizationFactor() / 4) / (this.#syncContext.getQuantizationFactor() / 4);
        this.#recordedStartTimes.push(this.#syncContext.isQuantizeEnabled() ? quantizedTimestamp : beat);
    }

    descheduleArea(start, duration) {
        this.#recordedStartTimes = this.#recordedStartTimes.filter(startTime => startTime < start || startTime > start + duration);
    }

    /**
     * Clears recording
     */
    clearRecording() {
        this.#recordedStartTimes = [];
    }

    /**
     * Connects the output of this node to the input of another node
     * @param {AudioNode} destination 
     * @returns {AudioNode} The destination that was passed in.
     */
    connect(destination) {
        this.#destinations.push(destination);
        return destination;
    }

    /**
     * Disconnects the output of this node from another node
     * @param {AudioNode} destination
     */
    disconnect(destination) {
        this.#destinations = this.#destinations.filter(savedDesination => savedDesination !== destination);
    }

    /**
     * @returns {AudioContext} The SamplePlayer's AudioContext
     */
    getAudioContext() {
        return this.#audioContext;
    }

    /**
     * @param {number} tempo The original tempo of the sample in bpm
     */
    setTrackTempo(tempo) {
        this.#trackTempo = tempo;
    }

    /**
     * @returns The tempo of the sample in bpm
     */
    getTrackTempo() {
        return this.#trackTempo;
    }

    /**
     * @param {number} pitch The number of cents to transpose the sample by. 100 cents is one semitone
     */
    setDetune(pitch) {
        this.#detune = pitch;
    }

    /**
     * @returns The number of cents the sample will be pitched up/down by. 100 cents is one semitone
     */
    getDetune() {
        return this.#detune;
    }
}

export {
    SamplePlayer as SamplePlayer
}