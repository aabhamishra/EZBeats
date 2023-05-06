class ConvReverb {
    /** @type {AudioContext} */ audioContext;
    /** @type {ConvolverNode} */ convNode;
    /** @type {GainNode} */ inputGainNode;
    /** @type {GainNode} */ outputGainNode;
    /** @type {GainNode} */ dryGainNode;
    /** @type {GainNode} */ wetGainNode;
    constructor(audioContext, wet) {
        this.audioContext = audioContext;
        this.convNode = this.audioContext.createConvolver();
        this.convNode.normalize = true;
        this.buffer = this.getImpulseBuffer("./impulse/Small Church.wav")
            .then((buffer) => this.convNode.buffer = buffer);

        this.inputGainNode = this.audioContext.createGain();
        this.outputGainNode = this.audioContext.createGain();
        this.dryGainNode = this.audioContext.createGain();
        this.wetGainNode = this.audioContext.createGain();

        this.dryGainNode.gain.value = 1 - wet;
        this.wetGainNode.gain.value = wet;

        this.inputGainNode.connect(this.wetGainNode);
        this.inputGainNode.connect(this.dryGainNode);
        this.wetGainNode.connect(this.convNode);
        this.convNode.connect(this.outputGainNode);
        this.dryGainNode.connect(this.outputGainNode);
    }

    getImpulseBuffer(impulseUrl){
        return fetch(impulseUrl)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    } 

    getInput() {
        return this.inputGainNode;
    }

    getOutput() {
        return this.outputGainNode;
    }

    setReverbWet(wet) {
        this.wetGainNode.gain.setValueAtTime(wet, this.audioContext.currentTime);
        this.dryGainNode.gain.setValueAtTime(1 - wet, this.audioContext.currentTime);
    }
}

export {
    ConvReverb as ConvReverb,
}