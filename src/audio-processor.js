import Module from "./q_wasm.js";

class PitchDetectionProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        Module._init(48000);
    }

    process(inputs) {
        const lInput = inputs[0][0];

        Module.HEAPF32.set(lInput, Module._getInputMemoryOffset() / 4);
        const frequency = Module._run(lInput.length);

        if (frequency > 0) {
            this.port.postMessage(frequency);
        }

        return true;
    }
}

registerProcessor('pitch-detection-processor', PitchDetectionProcessor)