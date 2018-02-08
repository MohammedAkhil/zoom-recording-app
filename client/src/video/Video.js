import React, { Component } from 'react';
import videojs from 'video.js'
import './Video.css';
import 'video.js/dist/video-js.css'
import './videojs.markers.css'

import videoJsOptions from './../config/videojs.config'
import server from './../config/config'

const CHAT_URL = 'api/recordings/chat/?chat_url=';

async function getMarkers(text) {
    return new Promise( (resolve, reject) => {
        let messages = [];
        let chats = text.split('\n');
        chats.forEach((chat, index) => {
            if (index === chats.length - 1) return;
            let chatItem = chat.split('\t');
            const time = chatItem[0].split(':');
            messages.push({
                position: index,
                time: (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]),
                username: chatItem[1],
                overlayText: chatItem[2],
                text: chatItem[2],
                class: 'custom-marker'
            })
        });
        resolve(messages);
    });
}

function fetchChat (chat_url) {
    let linkChat = server + CHAT_URL + chat_url;
    return new Promise((resolve, reject) => {
        fetch(linkChat, {
            method: 'GET',
            mode: 'cors'
        }).then(res => res.json())
            .then(data => resolve(data.text))
            .catch(err => reject(err))
    })
}

const setMarkers = (context, markerData) => {
    context.markers({
        markerStyle: {
            'width': '7px',
            'border-radius': '30%',
            'background-color': 'blue'
        },
        markerTip: {
            display: true,
            text: function (marker) {
                return marker.username +marker.text;
            },
            time: function (marker) {
                return marker.time;
            }
        },
        breakOverlay: {
            display: true,
            displayTime: 2,
            style: {
                'position': 'absolute',
                'height': 'fit-content',
                'width': 'fit-content',
                'top': 'unset',
                'color': 'white',
                'font-size': '12px',
                'background' : 'dodgerblue',
                'border-radius': '20px'
            },
            text: function (marker) {
                return marker.username.bold() +' ' + marker.overlayText;
            }
        },
        onMarkerClick: function (marker) {},
        onMarkerReached: function (marker) {
            const tip = document.querySelectorAll('.custom-marker')[marker.position];
            const seekBar = document.querySelector('.vjs-progress-control.vjs-control');
            const overlay = document.querySelector('.vjs-break-overlay');
            overlay.style.bottom = seekBar.offsetHeight + 'px';
            overlay.style.left = tip.offsetLeft
                + seekBar.offsetLeft + 'px';
        },
        markers: markerData
    });
};

class Video extends Component {

    back = (e) => {
        e.stopPropagation();
        this.props.history.goBack();
    };

    async componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.chat_url !== 'x') {
            try {
                let chatText = await fetchChat(this.props.chat_url);
                const markerData = await getMarkers(chatText);
                this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
                    setMarkers(this, markerData);
                });
            } catch (err) {
                alert(err)
            }
        } else {
            this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {});
        }
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
                    <button className='Video-button' onClick={this.back}/>
                    <br/><br/>
                    <div data-vjs-player  className="Video-Screen">
                        <video id = 'videox'
                               ref={node => this.videoNode = node}
                               className="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered"/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Video