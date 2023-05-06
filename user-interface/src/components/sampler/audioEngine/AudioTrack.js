import { SamplePlayer } from "./SamplePlayer.js";
import { EffectGroup } from "./EffectGroup.js";

/**
 * The class used to represent one track of audio containing the audio source and effects
 */
class AudioTrack {
    /** @type {SamplePlayer} The audio source */ #samplePlayer;
    /** @type {EffectGroup} The group containing all of the audio effects applied to the track */ #effectGroup;

    /**
     * Creates a new AudioTrack from a sample player 
     * @param {SamplePlayer} samplePlayer
     */
    constructor(samplePlayer) {
        this.#samplePlayer = samplePlayer;
        this.#effectGroup = new EffectGroup(this.#samplePlayer.getAudioContext());
        samplePlayer.connect(this.#effectGroup.getInput());
    }

    /** @returns {SamplePlayer} The AudioTrack's SamplePlayer */
    getSamplePlayer() {
        return this.#samplePlayer;
    }

    /** @returns {EffectGroup} The AudioTrack's EffectGroup */
    getEffectGroup() {
        return this.#effectGroup;
    }

    /**
     * Connects the output of this AudioTrack to an AudioNode 
     * @param {AudioNode} destination 
     */
    connect(destination) {
        this.#effectGroup.connect(destination);
    }
}

export {
    AudioTrack as AudioTrack
}