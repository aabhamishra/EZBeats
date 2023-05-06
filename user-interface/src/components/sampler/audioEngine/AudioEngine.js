import AudioSyncContext from "./AudioSyncContext.js";
import { AudioTrack } from "./AudioTrack.js";
import { Metronome } from "./Metronome.js";
import { SamplePlayer } from "./SamplePlayer.js";

class AudioEngine {
    #audioContext; // The audio context that will be used by all tracks and sends
    #syncContext; // The sychronization context used for sychronizing audio events
    
    #metronome; // A special audio track that bypasses the master track. Plays a beep every beat

    /** @type {AudioTrack[]} A list containing all the audio tracks */ #audioTracks = []; 

    #masterTrack; // A track with the source being the sum of all the audio tracks and sends. 
                  // That track can contain an effects and outputs to the device audio output
                  // TODO SHOULD BE A SEND THAT OUTPUTS TO DESTINATIOn

    #masterGainNode;

    constructor() {
        this.#audioTracks = [];
        // this.masterTrack = new AudioSend(); // TODO AudioSend not yet implemented
        this.#audioContext = new AudioContext();
        this.#syncContext = new AudioSyncContext(this.#audioContext);
        this.#masterGainNode = this.#audioContext.createGain();
        this.#masterGainNode.connect(this.#audioContext.destination);
        this.#metronome = new Metronome(this.#audioContext, this.#syncContext);
        this.#metronome.connect(this.#masterGainNode);
        this.#metronome.setVolume(.1);
    }

    setMasterVolume(volume) {
        this.#masterGainNode.gain.setValueAtTime(volume, this.#audioContext.currentTime);
    }

    /**
     * Adds a new sample track to the audio engine.
     * @param {string} filepath The filepath used as an arguement to {@link fetch} to get the audio sample data
     */
    addSampleTrack(filepath) {
        const sampleTrack = new AudioTrack(new SamplePlayer(this.#audioContext, this.#syncContext, filepath));
        sampleTrack.connect(this.#masterGainNode);
        this.#audioTracks.push(sampleTrack);
    }

    /**
     * @returns {AudioTrack[]} A list of all the sample tracks in the order the tracks were added.
     */
    getTracks() {
        return this.#audioTracks;
    }

    /**
     * @returns {AudioContext} The Web Audio Api AudioContext used by the AudioEngine
     */
    getAudioContext() {
        return this.#audioContext;
    }

    /**
     * @returns {AudioSyncContext} The AudioSyncContext used to synchonize audio events
     */
    getSyncContext() {
        return this.#syncContext;
    }

    /**
     * Enables recording
     */
    armRecord() {
        this.#syncContext.setRecording(true);
    }

    /**
     * Disables recording
     */
    stopRecord() {
        this.#syncContext.setRecording(false);
    }

    /**
     * Set whether or not the metronome will beep
     * @param {boolean} enabled If true the metronome will beep
     */
    setMetronomeEnabled(enabled) {
        this.#metronome.setEnabled(enabled);
    }

    isMetronomeEnabled() {
        return this.#metronome.isEnabled();
    }

    /**
     * Clears recordings for all tracks
     */
    clearRecording() {
        this.#audioTracks.forEach(track => track.getSamplePlayer().clearRecording());
    }
}

export {
    AudioEngine,
    AudioSyncContext
}