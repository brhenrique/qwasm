import React, {useEffect, useState} from "react"

export const DeviceSelector = ({onSelect}) => {
    const [audioInputs, setAudioInputs] = useState([]);

    useEffect(() => {
        (async () => {
            await navigator.mediaDevices.getUserMedia({audio: true, video: false});
            setAudioInputs((await navigator.mediaDevices.enumerateDevices({
                video: false,
                audio: true
            })).filter(a => a.kind === 'audioinput' && a.deviceId !== 'default'));
        })()
    }, []);

    console.log(audioInputs)

    return (<div style={{display: 'flex', justifyContent: 'center'}}>
        <select onChange={onChange}>
            <option>Select microphone...</option>
            {
                audioInputs.map((a, index) => <option key={index} value={a.deviceId}>{a.label}</option>)
            }
        </select>
    </div>);

    function onChange(event) {
        onSelect && onSelect(event.target.value);
    }
}