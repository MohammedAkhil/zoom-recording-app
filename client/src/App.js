import React, { Component } from 'react';
import loader from './settings.png';
import logo from './camera.png';
import './App.css';
import Recordings from './Recordings';
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:1790');

function subscribeToApi(cb) {
    alert('subscribeToApi');
    socket.on('recording', meetings => {
        alert(meetings);
        cb(null, getRecordings(meetings));
    });
    socket.emit('subscribe', 1000);
}

const getRecordings = (meetings) => {
    let recordings = [];
    meetings.forEach(meeting => {
        recordings.push({
            start_time: meeting.start_time,
            video: meeting.recording_files[0].play_url,
            audio: meeting.recording_files[1].play_url
        });
    });
    return recordings;
};

class App extends Component {

    componentDidMount() {
        subscribeToApi((err, recordings) => {
            alert(recordings.toString());
            this.setState({recordings: recordings, is_loading: false});
        });
    }

    // constructor(props) {
    //     super(props);
    //     subscribeToApi((err, recordings) => {
    //         this.setState({recordings: recordings, is_loading: false});
    //     });
    // }



    state = {
        recordings: [],
        is_loading: true
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Zoom Api - Cloud recordings</h1>
                </header>

                <p className="App-subtitle"> This page gives a list of video and audio recordings from zoom for all <br></br>
                    the meetings initiated from the account of the current user. </p>

                { this.state.is_loading ?  <div id="visible"><img src={loader} className = "App-loader" alt="logo" /> </div>: null }

                <p className="App-intro">
                    <ul>
                        <h3 className = "App-list"> Videos</h3>
                        <Recordings recordings = {this.state.recordings}/>
                    </ul>
                </p>
                <footer className="App-footer"><h1 className="App-title">www.gyanmatrix.com</h1></footer>
            </div>
        );
    }
}

export default App;