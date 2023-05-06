class EQ3 {
    /** @type {AudioContext} */ #audioContext;
    /** @type {GainNode} */ #inputGain;
    /** @type {GainNode} */ #outputGain;
    /** @type {number} */ #highfreq;
    /** @type {number} */ #lowfreq;
    /** @type {number} */ #highgain;
    /** @type {number} */ #lowgain;
    /** @type {number} */ #midgain;
    /** @type {BiquadFilterNode} */ #lowEq;
    /** @type {BiquadFilterNode} */ #highEq;
    /** @type {BiquadFilterNode} */ #midlowEq;
    /** @type {BiquadFilterNode} */ #midHighEq;
    /** @type {GainNode} */ #lowGainNode;
    /** @type {GainNode} */ #midGainNode;
    /** @type {GainNode} */ #highGainNode;

    constructor(audioContext) {
        this.#audioContext = audioContext;
        this.#highfreq = 8000;
        this.#lowfreq = 600;

        this.#inputGain = new GainNode(audioContext);
        this.#outputGain = new GainNode(audioContext);

        this.#lowGainNode = new GainNode(audioContext);
        this.#midGainNode = new GainNode(audioContext);
        this.#highGainNode = new GainNode(audioContext);

        this.#lowEq = new BiquadFilterNode(audioContext);
        this.#midlowEq = new BiquadFilterNode(audioContext);
        this.#midHighEq = new BiquadFilterNode(audioContext);
        this.#highEq = new BiquadFilterNode(audioContext);

        this.#lowEq.type = "lowpass";
        this.#midlowEq.type = "highpass";
        this.#midHighEq.type = "lowpass";
        this.#highEq.type = "highpass";

        this.#inputGain
            .connect(this.#lowEq)
            .connect(this.#lowGainNode)
            .connect(this.#outputGain);
        this.#inputGain
            .connect(this.#midlowEq)
            .connect(this.#midHighEq)
            .connect(this.#midGainNode)
            .connect(this.#outputGain);
        this.#inputGain
            .connect(this.#highEq)
            .connect(this.#highGainNode)
            .connect(this.#outputGain);
    }

    setLowFreq(frequency) {
        this.#lowfreq = frequency;
        this.#lowEq.frequency.setValueAtTime(this.#lowfreq, this.#audioContext.currentTime);
        this.#midlowEq.frequency.setValueAtTime(this.#lowfreq, this.#audioContext.currentTime);
    }

    setHighFreq(frequency) {
        this.#highfreq = frequency;
        this.#highEq.frequency.setValueAtTime(this.#highfreq, this.#audioContext.currentTime);
        this.#midHighEq.frequency.setValueAtTime(this.#highfreq, this.#audioContext.currentTime);
    }

    setHighGain(gain) {
        this.#highgain = gain;
        this.#highGainNode.gain.setValueAtTime(gain, this.#audioContext.currentTime);
    }

    setMidGain(gain) {
        this.#midgain = gain;
        this.#midGainNode.gain.setValueAtTime(gain, this.#audioContext.currentTime);
    }

    setLowGain(gain) {
        this.#lowgain = gain;
        this.#lowGainNode.gain.setValueAtTime(gain, this.#audioContext.currentTime);
    }

    getInput() {
        return this.#inputGain;
    }

    getOutput() {
        return this.#outputGain;
    }
}

export {
    EQ3 as EQ3
}