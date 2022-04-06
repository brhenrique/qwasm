import React, {useState} from "react"
import ReactDOM from "react-dom";

import './style.css'

import {DeviceSelector} from "./components/device-selector";
import {PitchVisualizer} from "./components/pitch-visualizer";

const App = () => {
    const [deviceId, setDeviceId] = useState(null);

    return (<div style={{'display': 'flex', 'placeContent': 'center', 'flexDirection': 'column'}}>
        <h1 style={{'textAlign': 'center'}}>Pitch detection</h1>
        <DeviceSelector onSelect={setDeviceId}/>
        <div style={{margin: "1em 0"}}></div>
        {deviceId && <PitchVisualizer deviceId={deviceId}/>}
    </div>)
}

ReactDOM.render(<App/>, document.getElementById("root"));
