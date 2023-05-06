/**
 * Context object used to sychronize track playback
 */
class AudioSyncContext {

    /**
     * @type {number} The interval in milliseconds that the clockCallbacks will be triggered.
     * Since the setInterval method does not guarentee exact timing, the method
     * AudioContext.currentTime should be used for sychronization 
     */
    static #CLOCKINTERVAL = 15;

    /** @type {AudioContext} AudioContext used for accurate timing */ #audioContext

    // Convert to bpm
    /** @type {number} The tempo in beats per minute for the current arrangement. The default value is 120 bpm */ #tempo; 
    /** @type {string} The current playback state. States can be found in {@link PlaybackState}*/ #playbackState;
    /** @type {number} The position playback is currently at measured in beats */ #playbackPosition

    /** @type {boolean} If true recorded notes will be quantized */ #quantizeEnabled;

    /**
     *  @type {number} The beat division a recorded note will be quantized to.
     *  For example when the quantizationFactor = 8 recorded notes will be quantized to 1/8th notes
     */
    #quantizationFactor;
    
    /** @type {function} The callback functions to be run when the playback state changes */
    #clockCallbacks 

    /** @type {function} The callback functions to be run when the tempo changes */
    #tempoCallbacks

    /** 
     * @type {number} The time, found using AudioContext.currentTime, of the last time runClock was called
     * This value will be in seconds since the AudioContext was created.
     */ 
    #lastTickTime;

    /** 
     * @type {boolean} If true, when audio playing and is incremented past loopEnd 
     * the playback time will jump back to loop start
     */ 
    #looping = true;

    /** @type {number} The start time of the loop in beats. */
    #loopStart = 0;

    /** @type {number} The end time of the loop in beats. */
    #loopEnd = 8; 

    /** @type {boolean} True if currently recording. False if otherwise */
    #recording;


    /**
     * Creates a new AudioSyncContext and starts the clock used to trigger clock callbacks.
     */
    constructor(audioContext) {
        this.#audioContext = audioContext;
        this.#tempo = 120;
        this.#playbackState = AudioSyncContext.PlaybackState.PAUSED;
        this.#playbackPosition = 0.0;
        this.#clockCallbacks = [];
        this.#tempoCallbacks = [];
        this.#recording = false;
        this.#quantizeEnabled = true;
        this.#quantizationFactor = 8;

        setInterval(time => this.runClock(), AudioSyncContext.#CLOCKINTERVAL);
    }
    
    /**
     * Adds a function to be called when the playback position is updated.
     * @param {Function} callback(playbackState, playbackPosition)
     *          A function that will be called when the playback 
     *          position is updated.
     *          playbackState {PlaybackState}: The current playback state
     *          playbackPosition {number}: The current playback position in beats
     */
    addClockCallback(callback) {
        this.#clockCallbacks.push(callback);
    }
    
    /**
     * Removes all occurences of a specific function from the callback list
     * so that the function will no longer be called when playback position
     * is updated.
     * @param {Function} callback: The function to be removed 
     */
    removeClockCallback(callback) {
        this.#clockCallbacks = this.#clockCallbacks.filter(currCallback => currCallback !== callback);
    }

    addTempoCallback(callback) {
        this.#tempoCallbacks.push(callback);
    }

    removeTempoCallback(callback) {
        this.#tempoCallbacks = this.#tempoCallbacks.filter(currCallback => currCallback !== callback);
    }

    /**
     * Triggers each of the clock callbacks and updates playback position while in the PLAYING state.
     */
    runClock() {
        const currTime = this.#audioContext.currentTime;
        const timeDiff = currTime - this.#lastTickTime;
        this.#lastTickTime = currTime;

        if(typeof this.#playbackState === 'string' && this.#playbackState === AudioSyncContext.PlaybackState.PLAYING) {
            let updatedPlaybackPosition = this.#playbackPosition + timeDiff * this.#tempo / 60;
            
            // Commented out for now as audio should always be plaing in a loop
            // this.#playbackPosition = 
            //     this.#playbackPosition < this.#loopEnd && updatedPlaybackPosition > this.#loopEnd ? // If the loop end is crossed
            //         this.#loopStart + updatedPlaybackPosition - this.#loopEnd:
            //         updatedPlaybackPosition;

            this.#playbackPosition = 
                updatedPlaybackPosition > this.#loopEnd ?
                    this.#loopStart + updatedPlaybackPosition % this.#loopEnd:
                    updatedPlaybackPosition;
        }

        this.#clockCallbacks.forEach(callback => callback(this.#playbackState, this.#playbackPosition));
    }

    /**
     * @returns The current tempo in bpm 
     */
    getTempo() {
        return this.#tempo;
    }

    /**
     * @param {number} tempo the new tempo in bpm 
     */
    setTempo(tempo) {
        this.#tempo = tempo;
        this.#tempoCallbacks.forEach(callback => callback(this.#tempo));
    }

    /**
     * @returns The current playback state as defined by {@link PlaybackState}
     */
    getPlaybackState() {
        return this.#playbackState
    }

    /**
     * Sets the playback state to a state defined by AudioSyncContext.PlaybackState.
     * Setting an unknown playback state will not change the playback state
     * @param {'string'} playbackState 
     */
    setPlaybackState(playbackState) {
        switch(playbackState) {
            case AudioSyncContext.PlaybackState.PLAYING:
            case AudioSyncContext.PlaybackState.PAUSED:
            case AudioSyncContext.PlaybackState.SEEKING:
                this.#playbackState = playbackState;
        }
    }

    /**
     * @returns The current playback position in beats
     */
    getPlaybackPosition() {
        return this.#playbackPosition;
    }

    /**
     * @returns The loop end in beats
     */
    getLoopEnd() {
        return this.#loopEnd;
    }

    /**
     * @param {number} loopEnd The loop end time in beats 
     */
    setLoopEnd(loopEnd) {
        this.#loopEnd = loopEnd; 
    }

    /**
     * @returns The loop start in beats
     */
    getLoopStart() {
        return this.#loopStart;
    }

    /**
     * @param {number} loopStart The loop start time in beats 
     */
    setLoopEnd(loopStart) {
        this.#loopStart = loopStart; 
    }


    /**
     * @param {boolean} recording whether or not recording will be enabled
     */
    setRecording(recording) {
        this.#recording = recording;
    }

    /**
     * @returns True if currently recording
     */
    isRecording() {
        return this.#recording;
    }

    /**
     * @param {number} quantizationFactor The quantization factor. 1 for whole note, 4 for quarternote, 8 for eight note, ect.
     */
    setQuantizationFactor(quantizationFactor) {
        this.#quantizationFactor = quantizationFactor;
    }

    /**
     * @returns The quantization factor
     */
    getQuantizationFactor() {
        return this.#quantizationFactor;
    }

    /**
     * @param {boolean} enabled If true notes will be quantized
     */
    setQuantizeEnabled(enabled) {
        this.#quantizeEnabled = enabled;
    }

    /**
     * @returns If true recorded notes are being quantized 
     */
    isQuantizeEnabled() {
        return this.#quantizeEnabled;
    }

    /**
     * Enum used to describe the current playback state of the arrangement
     */
    static PlaybackState = {
        PLAYING: 'playing', // The arrangement is playing. Playback position is incrementing according to the tempo
        SEEKING: 'seeking', // The playback position is manually being changed
        PAUSED: 'paused', // The playback position is constant
    }
}

export {
    AudioSyncContext as default
}