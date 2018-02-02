import React, { Component } from 'react';
import Marker from 'Marker';
import videojs from 'video.js'


class Video extends Component {

    constructor() {
        super(props);
        this.state = {
            isReady: false
        };
    }

    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
            this.setState({
                isReady: true
            });
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <div data-vjs-player>
                <video id = "video-x"
                       ref={node => this.videoNode = node}
                       className="video-js"/>
                {this.state.isReady
                    ? <Marker video={this.player}
                              chatString={this.props.chatString}/>
                    : null}
            </div>
        )
    }
}

export default Video