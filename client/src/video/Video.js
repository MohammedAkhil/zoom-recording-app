import React, { Component } from 'react';
import videojs from 'video.js'
import './Video.css';

import videoJsOptions from './../config/videojs.config'

function getMessages(chatString) {
    let chat = [];
    const regexp = /[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/g;
    const expression = '00:00:05 mohammed akhil:hey 00:00:09 akhil: hey mohammed! 00:00:12 mohammed akhil: i need a clarification 00:00:24 akhil: what is it';

    regexp[Symbol.split](expression).forEach((item, index) => {
        if (index !== 0) chat.push({
            text: item,
            overlayText: item,
            class: 'custom-marker'
        })
    });

    getTimestamp(chat).forEach((item, index) => {
        chat[index].time = item;
    });
    return chat;
}

function getTimestamp(chatString) {
    const regexp = new RegExp('[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}', 'g');
    const text = '00:00:05 mohammed akhil:hey 00:00:09 akhil: hey mohammed! 00:00:12 mohammed akhil: i need a clarification 00:00:24 akhil: what is it';
    let buffer;
    let seconds;
    let markerTime = [];

    while ((buffer = regexp.exec(text)) !== null) {
        const time = buffer[0].split(':');
        seconds = (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]);
        markerTime.push(seconds)
    }
    return markerTime;
}

class Video extends Component {

    back = (e) => {
        e.stopPropagation();
        this.props.history.goBack();
    };

    componentDidMount() {
        this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {

            this.markers({
                markerStyle: {
                    'width':'7px',
                    'border-radius': '30%',
                    'background-color': 'red'
                },
                markerTip:{
                    display: true,
                    text: function(marker) {
                        return marker.text;
                    },
                    time: function(marker) {
                        return marker.time;
                    }
                },
                breakOverlay:{
                    display: true,
                    displayTime: 3,
                    style:{
                        // 'width':'100%',
                        // 'height': '20%',

                        'background-color': 'rgba(0,0,0,0.7)',
                        'color': 'white',
                        // 'font-size': '15px'
                        'width': '30%',
                        'height':'20%',
                        'font-size':'10px',
                        'margin-top':'300px'


            
                    },
                    text: function(marker) {
                        return marker.overlayText;
                    }
                },
                onMarkerClick: function(marker) {},
                onMarkerReached: function(marker) {},
                markers: getMessages('')
            });
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return (
            <div className="Video-dim">
                <div className='Video-dialog'>
                    <div data-vjs-player  className="Video-Screen">
                        <video id = 'videox'
                               ref={node => this.videoNode = node}
                               className="video-js"/>
                    </div>
                    <br/>
                    <button onClick={this.back}>
                        back
                    </button>
                </div>
            </div>
        )
    }
}

export default Video