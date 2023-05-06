class DelayEffect {
    /** @type {GainNode} */ #inputGain;
    /** @type {GainNode} */ #wetGain;
    /** @type {GainNode} */ #dryGain;
    /** @type {DelayNode} */ #delayNode;
    /** @type {GainNode} */ #feedbackGain;
    /** @type {GainNode} */ #outputGain;
    
    /**
     * 
     * @param {AudioContext} audioContext 
     * @param {number} wet 
     * @param {number} feedback 
     * @param {number} time 
     */
    constructor(audioContext, wet, feedback, time) {
        this.#inputGain = audioContext.createGain();
        this.#wetGain = audioContext.createGain();
        this.#dryGain = audioContext.createGain();
        this.#delayNode = audioContext.createDelay();
        this.#feedbackGain = audioContext.createGain();
        this.#outputGain = audioContext.createGain();
        this.#inputGain.connect(this.#wetGain);
        this.#inputGain.connect(this.#dryGain);
        this.#wetGain.gain.value = wet;
        this.#dryGain.gain.value = 1 - wet;
        this.#wetGain.connect(this.#delayNode);
        this.#dryGain.connect(this.#outputGain);
        this.#delayNode.delayTime.value = time;
        this.#delayNode.connect(this.#outputGain);
        this.#delayNode.connect(this.#feedbackGain);
        this.#feedbackGain.gain.value = feedback;
        this.#feedbackGain.connect(this.#delayNode);
    }

    getInput() {
        return this.#inputGain;
    }

    getOutput() {
        return this.#outputGain;
    }
}
export {
    DelayEffect as DelayEffect
}