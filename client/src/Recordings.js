const React = require('react');
  

class Recordings extends React.Component {

    constructor(props) {
        super(props);
        Recordings.handleClick = Recordings.handleClick.bind(this);
    }

    static handleClick(event ,recording) {
        alert(recording[0].play_url);
    }

    static renderRecordings(recordings) {
        if (recordings.length > 0) {
            return recordings.map((recording, index) => (
                <li className="App-list">
                    <recording key={recording.id}>
                        {recording[0].recording_start}
                        <button onClick={event => Recordings.handleClick(event, recording)}>
                            Play
                        </button>
                    </recording>
                </li>
            ));
        }
        else return [];
    }

    render() {
        const recordings = Recordings.renderRecordings(this.props.recordings);

        return (
            <div>
            <section>
                { recordings }
            </section>
            </div>
        );
    }
}

module.exports = Recordings;