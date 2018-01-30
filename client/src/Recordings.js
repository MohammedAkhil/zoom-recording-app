const React = require('react');

function renderRecordings(recordings) {
    if (recordings.length > 0) {      
        return recordings.map((recording, index) => (
            <Recording key={index} recording={recording} />
        ));
    }
    else return [];
} 
  
const Recording = ({recording}) => {
    return ( 
        <li className="App-list"><recording key={recording.id}>
        <a href={recording.video}>{recording.start_time}</a>
    </recording></li>
    );
};


function renderAudioRecordings(recordings) {
    if (recordings.length > 0) {      
        return recordings.map((recording, index) => (
            <RecordingAudio key={index*2} recording={recording} />
        ));
    }
    else return [];
} 
  
const RecordingAudio = ({recording}) => {
    return ( 
        <li className="App-list"><recording key={recording.id}>
        <a href={recording.audio}>{recording.start_time}</a>
    </recording></li>
    );
};


class Recordings extends React.Component {
    render() {
        const recordings = renderRecordings(this.props.recordings);
        const audios = renderAudioRecordings(this.props.recordings);

        return (
            <div>
            <section>
                { recordings }
            </section>
            <section>
                <h3 className="App-list">Audio</h3>
                { audios }
            </section>
            </div>
        );
    }
}

module.exports = Recordings;