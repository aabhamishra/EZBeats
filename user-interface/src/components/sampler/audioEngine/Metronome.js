import AudioSyncContext from "./AudioSyncContext.js";

class Metronome {

    static #SCHEDULE_AHEAD_TIME = .10; // The time window in seconds where beeps will be prescheduled.
    #audioContext; // AudioContext used by the metronome
    #syncContext; // AudioSyncContext used to ensure accurate timing
    #destination; // The destination that audio will be sent to
    #beepScheduled; // True if a beep has been currently scheduled
    #offbeatGainNode; // A gain node specifying the volume of the metronome. Makes offbeats quieter.
    #gainNode; // A gain node specifying the overall volume
    /** @type {boolean} If true metronome will beep*/ #enabled;

    /**
     * Creates a new metronome object
     * @param {AudioContext} audioContext 
     * @param {AudioSyncContext} syncContext 
     */
    constructor(audioContext, syncContext) {
        this.#audioContext = audioContext;
        this.#syncContext = syncContext;
        this.#beepScheduled = false;
        this.#offbeatGainNode = this.#audioContext.createGain();
        this.#gainNode = this.#audioContext.createGain();
        this.#enabled = true;

        this.#syncContext.addClockCallback(
            (playbackState, playbackPostion) => this.schedule(playbackState, playbackPostion)
        );
    }

    /**
     * Schedules ahead a beep to be played when in play mode.
     * @param {AudioSyncContext.PlaybackState} playbackState 
     * @param {number} playbackPostion 
     */
    schedule(playbackState, playbackPostion) {
        if(!this.#enabled) return;
        if(this.#destination === undefined) return;
        if(playbackState !== AudioSyncContext.PlaybackState.PLAYING) return;

        const secToNextBeep = playbackPostion % 1 / this.#syncContext.getTempo() * 60;

        if(secToNextBeep < Metronome.#SCHEDULE_AHEAD_TIME) {
            if(this.#beepScheduled) return;
            this.#beepScheduled = true;
            let sourceOsc = this.#audioContext.createOscillator();
            sourceOsc.type = 'sine';
            sourceOsc.frequency.value = 880;

            const gain = playbackPostion % 4 < 1 ? 1 : .6;
            this.#offbeatGainNode.gain.setValueAtTime(gain, this.#audioContext.currentTime);

            sourceOsc.start(this.#audioContext.currentTime + secToNextBeep);
            sourceOsc.stop(this.#audioContext.currentTime + secToNextBeep + .1);
            sourceOsc
                .connect(this.#offbeatGainNode)
                .connect(this.#gainNode)
                .connect(this.#destination);
        } else {
            this.#beepScheduled = false;
        }
    }

    /**
     * A number in the range 0-1 specifying the volume of the metronome. 0 being silent and 1 being max.
     * @param {number} volume 
     */
    setVolume(volume) {
        this.#gainNode.gain.setValueAtTime(volume, this.#audioContext.currentTime);
    }

    /**
     * Allows us to connect the output of this node to be input into another node
     * @param {AudioNode} destination 
     */
    connect(destination) {
        this.#destination = destination;
    }

    /**
     * Set whether or not the metronome will beep
     * @param {boolean} enabled If true metronome will beep
     */
    setEnabled(enabled) {
        this.#enabled = enabled;
    }

    /**
     * @returns True if metronome is enabled
     */
    isEnabled() {
        return this.#enabled;
    }
}

export {
    Metronome
}