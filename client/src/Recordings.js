import Video from './video/Video';
import videoJsOptions from './config/videojs.config'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

const React = require('react');
let chat_url = '';

class Recordings extends React.Component {


    constructor(props) {
        super(props);
        Recordings.onClickLink = Recordings.onClickLink.bind(this);
    }

    static onClickLink(recording) {
        videoJsOptions.sources[0].src = recording[0].download_url;
        if (recording.length === 3) {
            chat_url = recording[2].download_url;
        } else {
            chat_url = 'x'
        }
    }

    static renderRecordings(recordings) {
        if (recordings.length > 0) {
            return recordings.map((recording, index) => (
                <li className="App-list"
                    key={recording[0].id}>

                    <Link to={`/video/${recording[0].id}`}
                          onClick={() => Recordings.onClickLink(recording)}
                    >
                        {recording[0].recording_start}
                    </Link>
                </li>
            ));
        }
        else return [];
    }

    render() {
        const recordings = Recordings.renderRecordings(this.props.recordings);
        return (
           <Router>
               <div>
                   <Switch>
                       <Route path="/video/:id" component={CreateVideoComponent}/>
                       <Route path='/test/:id' component={About}/>
                   </Switch>
                   <section>{ recordings }</section>
               </div>
           </Router>
        );
    }
}

const About = ({match}) => (
    <div>a</div>
);

const CreateVideoComponent = ({history}) => (
    <Video chat_url = {chat_url} history = {history}/>
);

export default Recordings;