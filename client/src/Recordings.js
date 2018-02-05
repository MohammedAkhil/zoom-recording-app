import Video from './video/Video';
import videoJsOptions from './config/videojs.config'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

const React = require('react');

class Recordings extends React.Component {

    constructor(props) {
        super(props);
        Recordings.onClickLink = Recordings.onClickLink.bind(this);
    }

    static onClickLink(download_url) {
        videoJsOptions.sources[0].src = download_url;
    }

    static renderRecordings(recordings) {
        if (recordings.length > 0) {
            return recordings.map((recording, index) => (
                <li className="App-list">
                    <Link to={`/video/${recording[0].id}`}
                          onClick={() => Recordings.onClickLink(recording[0].download_url)}
                          key={recording[0].id}>
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
                       <Route path="/video/:id" component={Video}/>
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

export default Recordings;