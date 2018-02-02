import React, { Component } from 'react';

class Marker extends Component {
    constructor() {
        super(props)
    }

    getMessages(chatString) {
        let chat = [];
        const regexp = /[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/g;
        const expression = '00:00:17	mohammed akhil:	yolo 00:00:18	mohammed akhil:	dfd';

        regexp[Symbol.split](expression).forEach((item, index) => {
            if (index !== 0) chat.push({text: item})
        });

        Marker.getTimestamp(chat).forEach((item, index) => {
            chat[index].time = item
        });
        return chat;
    }

    static getTimestamp(chatString) {
        const regexp = new RegExp('[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}', 'g');
        const history = `00:00:17	mohammed akhil:	yolo 00:01:18	mohammed akhil:	dfd`;
        let buffer;
        let seconds;
        let markerTime = [];

        while ((buffer = regexp.exec(history)) !== null) {
            const time = buffer[0].split(':');
            seconds = (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]);
            markerTime.push(seconds)
        }
        return markerTime;
    }

     render() {
        return (
            <p>
                {
                    this.props.video.markers({
                        markers: this.getMessages(this.props.chatString)
                    })
                }
            </p>
        )
     }
}
export default Marker