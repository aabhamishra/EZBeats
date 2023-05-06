import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import loginStateContext from "../../contexts/SamplerLoginStateContext";
import usernameContext from "../../contexts/SamplerUsername";
import stepStatsContext from "../../contexts/StepStatsContext";

import audioEngineContext from "../../contexts/AudioEngineContext";
import SelectedSampleContext from "../../contexts/SelectedSample";
import SamplesContext from "../../contexts/SamplesContext";
import { AudioEngine, AudioSyncContext } from "../sampler/audioEngine/AudioEngine.js"

const audioEngineSingleton = new AudioEngine();
// Init AudioEngine
for(let i = 0; i < 12; i++) audioEngineSingleton.addSampleTrack(`http://localhost:8080/preBuiltSoundByName?name=sound${i+1}`);

function SamplerLayout() {
    const [loginState, setLoginState] = useState(0);
    const [username, setUsername] = useState("");

    const [audioEngine, setAudioEngine] = useState(audioEngineSingleton);
    const [selectedSample, setSelectedSample] = useState(0);
    const [stepStats, setStepStats] = useState(Array(16).fill(false));
    const [samplesInfo, setSamplesInfo] = useState([]);
    
    const logout = () => {
        setLoginState(0);
    }
    
    return (
        <div>
            <Navbar bg="secondary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        Sound Stealer
                    </Navbar.Brand>
                </Container>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {loginState
                        ? <> <Nav.Link as={Link} to="editor" style={{ width: 100 }}>My Project</Nav.Link>
                            <Nav.Link as={Link} onClick={logout} to="/">logout</Nav.Link>
                        </>
                        : <Nav.Link as={Link} to="login">Login</Nav.Link>
                    }
                    <Nav.Link as={Link} to="register">Register</Nav.Link>
                </Nav>
            </Navbar>
            <SamplesContext.Provider value={[samplesInfo, setSamplesInfo]}>
                <stepStatsContext.Provider value={[stepStats, setStepStats]}>
                    <SelectedSampleContext.Provider value={[selectedSample, setSelectedSample]}>
                        <audioEngineContext.Provider value={[audioEngine, setAudioEngine]}>
                            <loginStateContext.Provider value={[loginState, setLoginState]}>
                                <usernameContext.Provider value={[username, setUsername]}>
                                    <Outlet />
                                </usernameContext.Provider>
                            </loginStateContext.Provider>
                        </audioEngineContext.Provider>
                    </SelectedSampleContext.Provider>
                </stepStatsContext.Provider>
            </SamplesContext.Provider>
        </div>
    );
}

export default SamplerLayout;