import React, {useEffect, useState} from 'react';

export const PitchVisualizer = ({deviceId}) => {
    const [frequencyHz, setFrequencyHz] = useState(null)

    useEffect(() => {
        if (!deviceId) {
            return;
        }

        (async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        deviceId: {exact: deviceId},
                        channelCount: 1,
                        sampleRate: 48000,
                    }, video: false
                })

                const audioContext = new AudioContext();
                await audioContext.audioWorklet.addModule('/audio-processor.js')
                const pitchDetectionNode = new AudioWorkletNode(audioContext, 'pitch-detection-processor', {processorOptions: {sampleRate: mediaStream.getAudioTracks()[0].getSettings().sampleRate}});

                pitchDetectionNode.port.onmessage = (e) => {
                    setFrequencyHz(Math.round(parseFloat(e.data) * 100) / 100);
                };

                const sourceNode = audioContext.createMediaStreamSource(mediaStream);

                sourceNode.connect(pitchDetectionNode);
            } catch (error) {
                console.error(error);
                throw error;
            }
        })()
    }, [deviceId]);

    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <span>{typeof frequencyHz === 'number' && !isNaN(frequencyHz) && frequencyHz} Hz</span>
    </div>
}