import React, { Component } from 'react';
import videojs from 'video.js'
import './Video.css';
import 'video.js/dist/video-js.css'
import './videojs.markers.css'

import videoJsOptions from './../config/videojs.config'
import server from './../config/config'

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
    let linkChat = server + 'api/recordings/chat/?chat_url=' + chat_url;
    return new Promise((resolve, reject) => {
        fetch(linkChat, {
            method: 'GET',
            mode: 'cors'
        }).then(res => res.json())
            .then(data => resolve(data.text))
            .catch(err => reject(err))
    })
}

class Video extends Component {

    back = (e) => {
        e.stopPropagation();
        this.props.history.goBack();
    };

    async componentDidMount() {
        if (this.props.chat_url) {
            try {
                let chatText = await fetchChat(this.props.chat_url);
                const markerData = await getMarkers(chatText);
                this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
                    this.markers({
                        markerStyle: {
                            'width': '7px',
                            'border-radius': '30%',
                            'background-color': 'red'
                        },
                        markerTip: {
                            display: true,
                            text: function (marker) {
                                return marker.text;
                            },
                            time: function (marker) {
                                return marker.time;
                            }
                        },
                        breakOverlay: {
                            display: true,
                            displayTime: 3,
                            style:{
                                'width':'100%',
                                'height': '12%',
                                'background-color': 'rgba(0,0,0,0.7)',
                                'color': 'white',
                                //'font-size': '15px'
                                'font-size':'15px',
                                'position': 'absolute',
                                'top': '20px',
                            },
                            text: function (marker) {
                                return marker.overlayText;
                            }
                        },
                        onMarkerClick: function (marker) {
                        },
                        onMarkerReached: function (marker) {
                        },
                        markers: markerData
                    });
                });
            } catch (err) {
                alert(err)
            }
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
                    <div data-vjs-player  className="Video-Screen">
                        <video id = 'videox'
                               ref={node => this.videoNode = node}
                               className="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered"/>
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