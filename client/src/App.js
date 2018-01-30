import React, { Component } from 'react';
import loader from './settings.png';
import logo from './camera.png';
import './App.css';
import { subscribeToApi } from './api';
import Recordings from './Recordings';

class App extends Component {

    constructor(props) {
        super(props);
        subscribeToApi((err, recordings) => {
            this.setState({recordings: recordings, is_loading: false});
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