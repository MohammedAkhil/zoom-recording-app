import React, { Component } from 'react';
import loader from './loader.svg';
import logo from './video.svg';
import './App.css';
import { subscribeToApi } from './api';
import markers from './../src/video/videojs.markers'
import Recordings from './Recordings';
let meetingData = [];
const getRecordings = (meetings) => {
    let recordings = [];
    meetings.forEach(meeting => {
        /** @namespace meeting.recording_files */
        recordings.push(meeting.recording_files);
        meetingData.push(meeting)
    });
    return recordings;

};

const About = () => (
    <div><br/><br/><br/><br/>This Website is a PoC (Proof of concept)</div>
);

class App extends Component {

    constructor(props) {
        super(props);
        subscribeToApi((err, meetings) => {
            this.meetings = meetings;
            this.setState({recordings: getRecordings(meetings), is_loading: false});
        });
    }

    state = {
        recordings: [],
        is_loading: true
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-header-image"  alt="logo" />
                    <h4 className="App-header-text">Cloud recordings</h4>

                </header>

                { this.state.is_loading ?
                    <div id="visible"><img src={loader} className = "App-loader" alt="logo" /> </div>
                    : null}

                <p className="App-intro">
                    <ul>
                        <Recordings recordings = {this.state.recordings} meetings = {meetingData}/>
                    </ul>
                </p>
                <br/>
                <br/><br/>
            </div>
        );
    }
}

export default App;