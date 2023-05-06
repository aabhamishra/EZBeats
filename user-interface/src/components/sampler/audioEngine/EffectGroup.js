class EffectGroup {
    /** @type {AudioNode[]} The effects on the send track in routing order */ #effectNodes;
    /** @type {GainNode} The node acting as the audio input */ #inputNode;
    /** @type {GainNode} The gain node controlling the send output volume */ #outputGainNode;

    /**
     * Creates a new EffectGroups. 
     * @param {AudioContext} audioContext 
     */
    constructor(audioContext) {
        this.#inputNode = audioContext.createGain();
        this.#outputGainNode = audioContext.createGain();
        // this.#outputGainNode.gain.setValueAtTime(.5, audioContext.currentTime);
        this.#effectNodes = [];
        this.#inputNode.connect(this.#outputGainNode);
    }

    /**
     * Returns the input node for the effect group. Do not use this node when connecting
     * nodes in a chain as the output of this node will bypass the rest of the effects chain. 
     * @returns The input node for the effect group
     */
    getInput() {
        return this.#inputNode;
    }
    /**
     * Connects the output of this node to the input of another node
     * @param {AudioNode} destination 
     * @returns {AudioNode} The destination that was passed in.
     */
    connect(destination) {
        return this.#outputGainNode.connect(destination);
    }

    /**
     * Disconnects the output of this node from another node
     * @param {AudioNode} destination
     */
    disconnect(destination) {
        return this.#outputGainNode.disconnect(destination);
    }

    /**
     * Replaces the effects in the effect group. 
     * @param {AudioNode[]} effectNodeList 
     */
    updateEffectList(effectNodeList) {
        this.#inputNode.disconnect(this.#effectNodes.length == 0 ? this.#outputGainNode : this.#effectNodes[0].getInput());
        
        this.#effectNodes.forEach((node, index) => {
            if(index == this.#effectNodes.length - 1) {
                node.getOutput().disconnect(this.#outputGainNode);
                return;
            }
            node.getOutput().disconnect(this.#effectNodes[index + 1].getInput());
            return;
        });

        this.#effectNodes = effectNodeList;

        this.#inputNode.connect(this.#effectNodes.length == 0 ? this.#outputGainNode : this.#effectNodes[0].getInput()); 
        
        this.#effectNodes.forEach((node, index) => {
            if(index == this.#effectNodes.length - 1) {
                node.getOutput().connect(this.#outputGainNode);
                return;
            }
            node.getOutput().connect(this.#effectNodes[index + 1].getInput());
            return;
        });
    }

    /**
     * @return The current effect list
     */
    getEffectList() {
        return this.#effectNodes;
    }
}

export {
    EffectGroup as EffectGroup
}